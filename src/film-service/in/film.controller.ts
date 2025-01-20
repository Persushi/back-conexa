import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpStatus,
    HttpCode,
    Logger,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { FilmDto } from '../dto/film.dto';
import { FilmModel } from '../model/film.model';
import { FilmService } from '../business/film.service';

@ApiTags('Films')
@Controller('Films')
@ApiBearerAuth()
export class FilmController {
    private readonly logger = new Logger(FilmController.name);
    constructor(private readonly FilmService: FilmService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new Film' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Film created successfully',
        type: FilmModel,
    })
    createFilm(@Body() FilmDto: FilmDto): Promise<FilmModel> {
        return this.FilmService.createFilm(FilmDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update Film' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Film updated successfully',
        type: FilmModel,
    })
    updateFilm(
        @Param('id') id: string,
        @Body() FilmDto: Partial<FilmDto>,
    ): Promise<FilmModel> {
        return this.FilmService.updateFilm(id, FilmDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete Film' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Film deleted successfully',
    })
    deleteFilm(@Param('id') id: string): Promise<void> {
        return this.FilmService.deleteFilm(id);
    }

    @Get('Title/:Title')
    getByTitle(@Param('Title') Title: string): Promise<FilmModel> {
        return this.FilmService.getByTitle(Title);
    }

    @Get('Synch')
    synchAndGetAll(): Promise<FilmModel[]> {
        return this.FilmService.synchAndGetAll()
    }
}