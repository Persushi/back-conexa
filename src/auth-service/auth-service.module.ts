import { Module } from '@nestjs/common';
import { AuthService } from './business/auth-service';
import { UserServiceModule } from 'src/user-service/user-service.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './business/jwt-service';
import { AuthController } from './in/auth.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'EstoDeberiaSerUnaEnv',
            signOptions: { expiresIn: '1h' },
        }),
        UserServiceModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }