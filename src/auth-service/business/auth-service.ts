import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpsertUserDto } from 'src/user-service/dto/upsertUserDto';
import { UserModel } from 'src/user-service/model/user.model';
import { UserService } from 'src/user-service/business/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService, // Inyección del servicio de usuario
        private readonly jwtService: JwtService,
    ) { }

    async login(email: string, password: string): Promise<string> {
        const user = await this.userService.getByEmail(email);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error('Invalid credentials');
        }

        return this.generateJwt(user);
    }

    async register(createUserDto: UpsertUserDto): Promise<{ status: number, message: string }> {
        return this.userService.createUser(createUserDto);
    }

    private generateJwt(user: UserModel): string {
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload);
    }
}
