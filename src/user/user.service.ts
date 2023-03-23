import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    // data.role = Number(data.role);
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return this.prisma.user.create({
      data,
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async listOne(id: number) {
    await this.exists(id);
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateAllFromUser(
    id: number,
    { email, birthAt, name, password, role }: UpdatePutUserDto,
  ) {
    await this.exists(id);

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
      data.password = await bcrypt.hash(password, await bcrypt.genSalt());
    }
    if (role) {
      data.role = Number(role);
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async updateFromUser(
    id: number,
    { email, birthAt, name, password, role }: UpdatePatchUserDto,
  ) {
    await this.exists(id);

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
      data.password = await bcrypt.hash(password, await bcrypt.genSalt());
    }
    if (role) {
      data.role = role;
    }

    return this.prisma.user.update({ where: { id }, data: data });
  }

  async deleteUser(id: number) {
    await this.exists(id);
    return this.prisma.user.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`O usuario ${id} não existe!`);
    }
  }
}
