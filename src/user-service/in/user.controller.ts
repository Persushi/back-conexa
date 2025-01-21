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
import { UserDto } from '../dto/user.dto';
import { UserModel } from '../model/user.model';
import { UserService } from '../business/user.service';
import { CreateUserDto } from '../dto/createUserDto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'User created successfully',
        type: UserModel,
    })
    createUser(@Body() user: CreateUserDto): Promise<UserModel> {
        return this.userService.createUser(user);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User updated successfully',
        type: UserModel,
    })
    updateUser(
        @Param('id') id: string,
        @Body() userDto: Partial<UserDto>,
    ): Promise<UserModel> {
        return this.userService.updateUser(id, userDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete user' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'User deleted successfully',
    })
    deleteUser(@Param('id') id: string): Promise<void> {
        return this.userService.deleteUser(id);
    }

    @Get('email/:email')
    getStatusByEmail(@Param('email') email: string): Promise<UserModel> {
        return this.userService.getByEmail(email);
    }
}