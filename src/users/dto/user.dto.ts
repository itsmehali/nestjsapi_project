import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  @ApiProperty({ type: Number, description: 'number' })
  id: number;

  @Expose()
  @ApiProperty({ type: String, description: 'email' })
  email: string;
}
