import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  @ApiProperty({ type: Number, description: 'number' })
  id: number;

  @Expose()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @Exclude()
  @ApiProperty({ type: Boolean, description: 'user' })
  roles: string;
}
