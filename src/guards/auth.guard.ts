import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      //console.log(authorization);
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );
      //console.log({ data });
      const user = await this.userService.listOne(Number(data.id));
      //console.log(user);
      request.tokenPayload = data;
      request.user = user;
      return true;
    } catch (error) {
      //console.log(error);
      return false;
    }
  }
}
