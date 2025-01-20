import { FilmGateway } from '../model/gateway/film.gateway';
import { FilmModel } from '../model/film.model';
import { FilmDto } from '../dto/film.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FilmService {
    constructor(
        @Inject('FilmGateway') private readonly FilmGateway: FilmGateway,
    ) { }

    createFilm(FilmDto: FilmDto): Promise<FilmModel> {
        return this.FilmGateway.create(FilmDto);
    }

    updateFilm(id: string, FilmDto: Partial<FilmDto>): Promise<FilmModel> {
        return this.FilmGateway.update(id, FilmDto);
    }

    deleteFilm(id: string): Promise<void> {
        return this.FilmGateway.delete(id);
    }

    getByTitle(title: string): Promise<FilmModel> {
        return this.FilmGateway.findByTitle(title);
    }

    synchAndGetAll(): Promise<FilmModel[]> {
        return this.FilmGateway.findAllAndSynch();
    }
}