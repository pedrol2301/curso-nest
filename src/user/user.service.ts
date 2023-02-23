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
    return this.prisma.user.update({
      where: { id },
      data: {
        email,
        birthAt: birthAt ? new Date(birthAt) : null,
        name,
        password,
      },
    });
  }

  async updateFromUser(id: number, data: UpdatePatchUserDto) {
    data.birthAt = data.birthAt ? new Date(data.birthAt).toString() : null;
    return this.prisma.user.update({ where: { id }, data });
  }
}
