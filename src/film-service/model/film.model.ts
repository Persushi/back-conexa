import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsUrl, IsDateString, IsArray } from 'class-validator';

export class FilmModel {
    @ApiProperty({
        description: 'Title of the film',
        example: 'A New Hope',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Episode number of the film',
        example: 4,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    episode_id?: number;

    @ApiProperty({
        description: 'Opening crawl text of the film',
        example: 'It is a period of civil war...',
        required: false,
    })
    @IsOptional()
    @IsString()
    opening_crawl?: string;

    @ApiProperty({
        description: 'Director of the film',
        example: 'George Lucas',
    })
    @IsString()
    director: string;

    @ApiProperty({
        description: 'Producer(s) of the film',
        example: 'Gary Kurtz, Rick McCallum',
    })
    @IsString()
    producer: string;

    @ApiProperty({
        description: 'Release date of the film',
        example: '1977-05-25',
    })
    @IsDateString()
    release_date: string;

    @ApiProperty({
        description: 'Creation timestamp',
        example: '2024-01-01T00:00:00Z',
    })
    @IsDateString()
    created: string;

    @ApiProperty({
        description: 'Last update timestamp',
        example: '2024-01-01T00:00:00Z',
    })
    @IsDateString()
    edited: string;

    @ApiProperty({
        description: 'URL of the film resource',
        example: 'https://swapi.dev/api/films/1/',
    })
    @IsUrl()
    @IsOptional()
    url?: string;

    // Propiedades opcionales de StarWarsFilm
    @ApiProperty({
        description: 'Array of character URLs related to the film',
        example: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/'],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    characters?: string[];

    @ApiProperty({
        description: 'Array of planet URLs related to the film',
        example: ['https://swapi.dev/api/planets/1/', 'https://swapi.dev/api/planets/2/'],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    planets?: string[];

    @ApiProperty({
        description: 'Array of starship URLs related to the film',
        example: ['https://swapi.dev/api/starships/1/', 'https://swapi.dev/api/starships/2/'],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    starships?: string[];

    @ApiProperty({
        description: 'Array of vehicle URLs related to the film',
        example: ['https://swapi.dev/api/vehicles/1/', 'https://swapi.dev/api/vehicles/2/'],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    vehicles?: string[];

    @ApiProperty({
        description: 'Array of species URLs related to the film',
        example: ['https://swapi.dev/api/species/1/', 'https://swapi.dev/api/species/2/'],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    species?: string[];
}
