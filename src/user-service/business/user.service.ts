import { UserGateway } from '../model/gateway/user.gateway';
import { UserModel } from '../model/user.model';
import { UserDto } from '../dto/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUserDto';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserGateway') private readonly userGateway: UserGateway,
    ) { }

    createUser(user: CreateUserDto): Promise<UserModel> {
        return this.userGateway.create(user);
    }

    updateUser(id: string, user: Partial<UserDto>): Promise<UserModel> {
        return this.userGateway.update(id, user);
    }

    deleteUser(id: string): Promise<void> {
        return this.userGateway.delete(id);
    }

    getByEmail(email: string): Promise<UserModel> {
        return this.userGateway.findByEmail(email);
    }
}