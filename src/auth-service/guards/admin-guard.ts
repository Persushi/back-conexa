import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-guard';

@Injectable()
export class AdminGuard extends JwtAuthGuard {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user && user.isAdmin) {
            return true;
        }

        return false;
    }
}
