import { Injectable, Logger } from '@nestjs/common';
import { UserGateway } from '../../../model/gateway/user.gateway'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../db-entities/typeorm/user.entity';
import { Repository } from 'typeorm';
import { UserModel } from '../../../model/user.model';
import { UserDto } from '../../../dto/user.dto';
import { CreateUserDto } from 'src/user-service/dto/createUserDto';

@Injectable()
export class UserRepository implements UserGateway {
    private readonly logger = new Logger(UserRepository.name);

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async create(user: CreateUserDto): Promise<UserModel> {
        try {
            const newUser = this.userRepository.create(user);
            const savedUser = await this.userRepository.save(newUser);
            return mapToUserModel(savedUser);
        } catch (error) {
            this.logger.error('Error creating user', error.stack);
            throw new Error('Error creating user');
        }
    }

    async update(id: string, user: Partial<UserDto>): Promise<UserModel> {
        try {
            await this.userRepository.update(id, user);
            const updatedUser = await this.userRepository.findOne({ where: { id } });
            if (!updatedUser) {
                throw new Error(`User with ID ${id} not found`);
            }
            return mapToUserModel(updatedUser);
        } catch (error) {
            this.logger.error(`Error updating user with ID ${id}`, error.stack);
            throw new Error('Error updating user');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const result = await this.userRepository.delete(id);
            if (result.affected === 0) {
                throw new Error(`User with ID ${id} not found`);
            }
            return
        } catch (error) {
            this.logger.error(`Error deleting user with ID ${id}`, error.stack);
            throw new Error('Error deleting user');
        }
    }

    async findAll(): Promise<UserModel[]> {
        try {
            const list = await this.userRepository.find();
            return list.map(e => mapToUserModel(e))
        } catch (error) {
            this.logger.error('Error fetching all users', error.stack);
            throw new Error('Error fetching all users');
        }
    }

    async findByEmail(email: string): Promise<UserModel> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new Error(`User with email ${email} not found`);
            }
            return mapToUserModel(user);
        } catch (error) {
            this.logger.error(`Error finding user with email ${email}`, error.stack);
            throw new Error('Error finding user');
        }
    }
}

// en caso de que las propiedades difieran por nombres
const mapToUserModel = (user: User): UserModel => {
    return {
        id: user.id,
        email: user.email
    }
}