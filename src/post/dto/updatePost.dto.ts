import { IsString, IsOptional, IsNumber } from 'class-validator';
import { User } from 'src/users/user.entity';
export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;
}
