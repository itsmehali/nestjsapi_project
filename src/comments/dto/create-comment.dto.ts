import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  comment: string;

  userId: number;

  postId: number;
}
