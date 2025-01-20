import { UserModel } from '../user.model';
import { UserDto } from '../../dto/user.dto';

export interface UserGateway {
    create(user: UserDto): Promise<UserModel>;
    update(id: string, user: Partial<UserDto>): Promise<UserModel>;
    delete(id: string): Promise<void>;
    findAll(): Promise<UserModel[]>;
    findByEmail(email: string): Promise<UserModel>;
}