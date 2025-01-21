import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserGateway } from '../../../model/gateway/user.gateway'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../db-entities/typeorm/user.entity';
import { Repository } from 'typeorm';
import { UserModel } from '../../../model/user.model';
import { UserDto } from '../../../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UpsertUserDto } from 'src/user-service/dto/upsertUserDto';

@Injectable()
export class UserRepository implements UserGateway {
    private readonly logger = new Logger(UserRepository.name);

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async create(user: UpsertUserDto): Promise<{ status: number, message: string }> {
        try {
            const check = await this.userRepository.findOne({ where: { email: user?.email } });
            if (check) {
                throw new BadRequestException('User already exists.');
            }
            user.password = await bcrypt.hash(user.password, 10)
            const newUser = this.userRepository.create(user);
            const savedUser = await this.userRepository.save(newUser);
            return { status: 201, message: 'User created successfully' };
        } catch (error) {
            this.logger.error('Error creating user', error.stack);
            return error.response
        }
    }

    async update(id: string, user: Partial<UserDto>): Promise<{ status: number, message: string }> {
        try {
            await this.userRepository.update(id, user);
            const updatedUser = await this.userRepository.findOne({ where: { id } });
            if (!updatedUser) {
                throw new Error(`User with ID ${id} not found`);
            }
            return { status: 201, message: 'User updated' };
        } catch (error) {
            this.logger.error(`Error updating user with ID ${id}`, error.stack);
            return error.response
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
            return error.response
        }
    }

    async findAll(): Promise<UserModel[]> {
        try {
            const list = await this.userRepository.find();
            return list.map(e => mapToUserModel(e))
        } catch (error) {
            this.logger.error('Error fetching all users', error.stack);
            return error.response
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
            return error.response
        }
    }
}

// en caso de que las propiedades difieran por nombres
const mapToUserModel = (user: User): UserModel => {
    return {
        id: user.id,
        email: user.email,
        password: user.password,
        admin: user.admin
    }
}