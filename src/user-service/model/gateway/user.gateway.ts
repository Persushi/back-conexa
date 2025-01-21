import { UserModel } from '../user.model';
import { UserDto } from '../../dto/user.dto';
import { CreateUserDto } from 'src/user-service/dto/createUserDto';

export interface UserGateway {
    create(user: CreateUserDto): Promise<UserModel>;
    update(id: string, user: Partial<UserDto>): Promise<UserModel>;
    delete(id: string): Promise<void>;
    findAll(): Promise<UserModel[]>;
    findByEmail(email: string): Promise<UserModel>;
}