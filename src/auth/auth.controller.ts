import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { AuthForgotDTO } from './dto/auth-forgot.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forgot')
  async forgot(@Body() { email }: AuthForgotDTO) {
    return this.authService.forgot(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    // return header;
    return { me: 'ok', user };
  }
}
