import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostsService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [PostsService],
})
export class PostModule {}
