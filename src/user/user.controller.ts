import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async listOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.listOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePutUserDto,
  ) {
    return this.userService.updateAllFromUser(id, body);
  }

  @Patch(':id')
  updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePatchUserDto,
  ) {
    return this.userService.updateFromUser(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return { id };
  }
}
