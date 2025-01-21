import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './out/db-entities/typeorm/film.entity';
import { FilmService } from './business/film.service';
import { FilmRepository } from './out/impl/postgres/film.repository';
import { FilmController } from './in/film.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Film]),
    ],
    controllers: [FilmController],
    providers: [
        FilmService,
        {
            provide: 'FilmGateway',
            useClass: FilmRepository,
        }
    ],
    exports: [
        FilmService,
        'FilmGateway',
        TypeOrmModule,
    ],
})
export class FilmServiceModule { }
