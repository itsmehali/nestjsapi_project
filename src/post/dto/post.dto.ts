import { Expose, Transform } from 'class-transformer';

export class PostDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  image: string;

  @Expose()
  createdAt: Date;

  // destructuring, obj is a reference to the original report entity
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
