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
    UseGuards,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { UserModel } from '../model/user.model';
import { UserService } from '../business/user.service';
import { UpsertUserDto } from '../dto/upsertUserDto';
import { AdminGuard } from 'src/auth-service/guards/admin-guard';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) { }

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
        @Body() userDto: UpsertUserDto,
    ): Promise<{ status: number, message: string }> {
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
    @ApiOperation({ summary: 'Get an user by email' })
    @ApiResponse({
        status: HttpStatus.ACCEPTED,
        description: 'User data',
    })
    getStatusByEmail(@Param('email') email: string): Promise<UserModel> {
        return this.userService.getByEmail(email);
    }
}