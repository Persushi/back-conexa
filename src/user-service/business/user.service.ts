import { UserGateway } from '../model/gateway/user.gateway';
import { UserModel } from '../model/user.model';
import { UserDto } from '../dto/user.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserGateway') private readonly userGateway: UserGateway,
    ) { }

    createUser(userDto: UserDto): Promise<UserModel> {
        return this.userGateway.create(userDto);
    }

    updateUser(id: string, userDto: Partial<UserDto>): Promise<UserModel> {
        return this.userGateway.update(id, userDto);
    }

    deleteUser(id: string): Promise<void> {
        return this.userGateway.delete(id);
    }

    getByEmail(email: string): Promise<UserModel> {
        return this.userGateway.findByEmail(email);
    }
}