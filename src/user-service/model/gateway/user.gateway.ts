import { UserModel } from '../user.model';
import { UserDto } from '../../dto/user.dto';
import { UpsertUserDto } from 'src/user-service/dto/upsertUserDto';

export interface UserGateway {
    create(user: UpsertUserDto): Promise<UserModel>;
    update(id: string, user: Partial<UserDto>): Promise<UserModel>;
    delete(id: string): Promise<void>;
    findAll(): Promise<UserModel[]>;
    findByEmail(email: string): Promise<UserModel>;
}