import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsOptional()
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
