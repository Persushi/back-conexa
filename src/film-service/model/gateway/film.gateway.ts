import { FilmModel } from '../film.model';
import { FilmDto } from '../../dto/film.dto';

export interface FilmGateway {
    create(Film: FilmDto): Promise<FilmModel>;
    update(id: string, Film: Partial<FilmDto>): Promise<FilmModel>;
    delete(id: string): Promise<void>;
    findAllAndSynch(): Promise<FilmModel[]>; // y sincronizar
    findByTitle(title: string): Promise<FilmModel>;
}