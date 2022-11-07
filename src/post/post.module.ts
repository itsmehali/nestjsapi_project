import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostsService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [PostController],
  providers: [PostsService],
})
export class PostModule {}
