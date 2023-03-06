import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async listOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateAllFromUser(
    id: number,
    { email, birthAt, name, password }: UpdatePutUserDto,
  ) {
    const data: any = {};

    if (email) {
      data.email = email;
    }
    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      data.password = password;
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async updateFromUser(
    id: number,
    { email, birthAt, name, password }: UpdatePatchUserDto,
  ) {
    const data: any = {};

    if (email) {
      data.email = email;
    }
    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      data.password = password;
    }

    return this.prisma.user.update({ where: { id }, data: data });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
