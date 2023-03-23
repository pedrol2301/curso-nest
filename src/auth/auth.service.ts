import { Injectable } from '@nestjs/common';
import {
  UnauthorizedException,
  HttpException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    return {
      accesToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
      });
      return data;
    } catch (error) {
      throw new HttpException(error, 400, { cause: new Error(error) });
    }
  }

  isValidToken(token: string): boolean {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!user) throw new UnauthorizedException('Email e/ou Senha incorreto!');

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Email e/ou Senha incorreto!');
    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }

  async forgot(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user)
      throw new UnauthorizedException('Email não existe na base de dados');

    // @todo: Enviar Email

    return true;
  }

  async reset(password: string, token: string) {
    // @todo: Validar Token
    const id = 0;
    const user = await this.prisma.user.update({
      where: { id },
      data: { password },
    });
    return this.createToken(user);
  }
}
