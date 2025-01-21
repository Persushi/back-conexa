import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Injectable, Logger } from '@nestjs/common';
import { FilmGateway } from '../../../model/gateway/film.gateway'
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../../db-entities/typeorm/film.entity';
import { Repository } from 'typeorm';
import { FilmModel } from '../../../model/film.model';
import { FilmDto } from '../../../dto/film.dto';

@Injectable()
export class FilmRepository implements FilmGateway {
    private readonly logger = new Logger(FilmRepository.name);

    constructor(
        @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
    ) { }

    async findByTitle(title: string): Promise<FilmModel> {
        try {
            const film = await this.filmRepository.findOne({ where: { title } });
            if (!film) {
                throw new Error(`Film with title ${title} not found`);
            }
            return mapToFilmModel(film, true);
        } catch (error) {
            this.logger.error(`Error finding film`, error.stack);
            throw new Error('Error finding film');
        }
    }

    async create(filmDto: FilmDto): Promise<FilmModel> {
        try {
            const film = this.filmRepository.create(filmDto);
            const savedFilm = await this.filmRepository.save(film);
            return mapToFilmModel(savedFilm, true);
        } catch (error) {
            this.logger.error(`Error creating film`, error.stack);
            throw new Error('Error creating film');
        }
    }

    async update(id: string, filmDto: Partial<FilmDto>): Promise<FilmModel> {
        try {
            const film = await this.filmRepository.findOne({ where: { id } });
            if (!film) {
                throw new Error(`Film with id ${id} not found`);
            }
            const updatedFilm = this.filmRepository.merge(film, filmDto);
            const savedFilm = await this.filmRepository.save(updatedFilm);
            return mapToFilmModel(savedFilm, true);
        } catch (error) {
            this.logger.error(`Error updating film with id ${id}`, error.stack);
            throw new Error('Error updating film');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const result = await this.filmRepository.delete(id);
            if (result.affected === 0) {
                throw new Error(`Film with id ${id} not found`);
            }
        } catch (error) {
            this.logger.error(`Error deleting film with id ${id}`, error.stack);
            throw new Error('Error deleting film');
        }
    }

    async findAll(synch: boolean): Promise<FilmModel[]> {
        try {
            if (synch) await this.synch()
            const films = await this.filmRepository.find();

            return films.map(film => mapToFilmModel(film, false));
        } catch (error) {
            this.logger.error('Error retrieving all films', error.stack);
            throw new Error('Error retrieving all films');
        }
    }

    async synch(): Promise<void> {
        try {
            const response = await axios.get<SwapiResponse>('https://swapi.dev/api/films/');
            const externalFilms = response.data.results;

            const upsertData = externalFilms.map(film => mapToFilmEntity(film))

            await this.filmRepository.upsert(upsertData, ['title']);

            this.logger.log('Synchronization completed successfully');
        } catch (error) {
            this.logger.error('Error synchronizing films', error.stack);
            throw new Error('Error synchronizing films');
        }
    }


}

interface SwapiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: FilmModel[];
}

// en caso de que las propiedades difieran por nombres
const mapToFilmModel = (film: Film, allInfo: boolean): FilmModel => {
    const baseModel: FilmModel = {
        title: film.title,
        episode_id: film.episodeId,
        opening_crawl: film.openingCrawl,
        director: film.director,
        producer: film.producer,
        release_date: film.releaseDate,
        created: film.createdAt.toDateString(),
        edited: film.updatedAt.toDateString(),
        id: film.id
    };

    if (allInfo) {
        return {
            ...baseModel,
            url: film.url ?? undefined,
            characters: film.characters ?? undefined,
            planets: film.planets ?? undefined,
            starships: film.starships ?? undefined,
            vehicles: film.vehicles ?? undefined,
            species: film.species ?? undefined,
        };
    }

    return baseModel;
};

const mapToFilmEntity = (filmModel: FilmModel): Film => {
    return {
        id: filmModel.id ?? uuidv4(), // Genera un UUID si no existe
        title: filmModel.title,
        episodeId: filmModel.episode_id ?? undefined,
        openingCrawl: filmModel.opening_crawl ?? undefined,
        director: filmModel.director,
        producer: filmModel.producer,
        releaseDate: filmModel.release_date,
        createdAt: new Date(filmModel.created),
        updatedAt: new Date(filmModel.edited),
        url: filmModel.url ?? undefined,
        characters: filmModel.characters ?? [],
        planets: filmModel.planets ?? [],
        starships: filmModel.starships ?? [],
        vehicles: filmModel.vehicles ?? [],
        species: filmModel.species ?? [],
    };
};