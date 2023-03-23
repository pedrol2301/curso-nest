import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword({ minLength: 6 })
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthAt: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  role: number;
}
