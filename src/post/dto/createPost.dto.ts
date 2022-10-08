import { IsString, IsNumber } from 'class-validator';
export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;
}
