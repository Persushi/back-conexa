import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './out/db-entities/typeorm/user.entity';
import { UserService } from './business/user.service';
import { UserRepository } from './out/impl/postgres/user.repository';
import { UserController } from './in/user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: 'UserGateway',
            useClass: UserRepository,
        }
    ],
    exports: [
        UserService,
        'UserGateway',
        TypeOrmModule,
    ],
})
export class UserServiceModule { }
