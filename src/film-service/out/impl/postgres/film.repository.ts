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
    findByTitle(title: string): Promise<FilmModel> {
        throw new Error('Method not implemented.');
    }
    create(Film: FilmDto): Promise<FilmModel> {
        throw new Error('Method not implemented.');
    }
    update(id: string, Film: Partial<FilmDto>): Promise<FilmModel> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    findAllAndSynch(): Promise<FilmModel[]> {
        throw new Error('Method not implemented.');
    }
}

