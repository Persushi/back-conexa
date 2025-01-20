import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsUrl, IsDateString, IsArray } from 'class-validator';

export class FilmDto {
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
        description: 'URL of the film resource',
        example: 'https://swapi.dev/api/films/1/',
    })
    @IsUrl()
    @IsOptional()
    url?: string;
}
