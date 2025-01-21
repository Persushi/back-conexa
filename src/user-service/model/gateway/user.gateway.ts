import { UserModel } from '../user.model';
import { UserDto } from '../../dto/user.dto';
import { UpsertUserDto } from 'src/user-service/dto/upsertUserDto';

export interface UserGateway {
    create(user: UpsertUserDto): Promise<{ status: number, message: string }>;
    update(id: string, user: Partial<UserDto>): Promise<{ status: number, message: string }>;
    delete(id: string): Promise<void>;
    findAll(): Promise<UserModel[]>;
    findByEmail(email: string): Promise<UserModel>;
}