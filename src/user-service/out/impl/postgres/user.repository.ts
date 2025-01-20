import { Injectable, Logger } from '@nestjs/common';
import { UserGateway } from '../../../model/gateway/user.gateway'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../db-entities/typeorm/user.entity';
import { Repository } from 'typeorm';
import { UserModel } from '../../../model/user.model';
import { UserDto } from '../../../dto/user.dto';

@Injectable()
export class UserRepository implements UserGateway {
    private readonly logger = new Logger(UserRepository.name);

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }
    create(user: UserDto): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }
    update(id: string, user: Partial<UserDto>): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<UserModel[]> {
        throw new Error('Method not implemented.');
    }

    findByEmail(email: string): Promise<UserModel> {
        throw new Error('Method not implemented.');
    };
}

