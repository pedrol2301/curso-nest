import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Put,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiParam } from '@nestjs/swagger/dist';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Roles(Role.Admin)
  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  @ApiParam({ name: 'id', allowEmptyValue: false, type: Number, example: 1 })
  async listOne(@ParamId('id') id: number) {
    console.log(id);
    return this.userService.listOne(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(@ParamId('id') id: number, @Body() body: UpdatePutUserDto) {
    return this.userService.updateAllFromUser(id, body);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updatePartial(
    @ParamId('id') id: number,
    @Body() body: UpdatePatchUserDto,
  ) {
    console.log(body);
    return this.userService.updateFromUser(id, body);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@ParamId('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
