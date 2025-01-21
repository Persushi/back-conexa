import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../business/auth-service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpsertUserDto } from 'src/user-service/dto/upsertUserDto';
import { LoginUserDto } from '../dto/loginUserDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Login to get a JWT token' })
    @ApiResponse({ status: 200, description: 'JWT token returned.' })
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto.email, loginUserDto.password);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully.' })
    async register(@Body() createUserDto: UpsertUserDto) {
        return this.authService.register(createUserDto);
    }
}
