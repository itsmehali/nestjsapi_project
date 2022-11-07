import { IsOptional, IsString } from 'class-validator';
export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  userId: number;
}
