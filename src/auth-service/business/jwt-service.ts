import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from 'src/user-service/model/user.model';
import { JwtGateway } from '../model/gateway/jwt.gateway';
import { UserService } from 'src/user-service/business/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'EstoDeberiaSerUnaEnv',
        });
    }

    async validate(payload: JwtGateway): Promise<any> {
        const user: UserModel = await this.userService.getByEmail(payload.email);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return { userId: user.id, email: user.email, isAdmin: user.admin };
    }
}
