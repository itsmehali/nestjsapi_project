import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { PostsService } from 'src/post/post.service';
import { PostModule } from 'src/post/post.module';
import { PostEntity } from 'src/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, PostEntity])],
  controllers: [CommentsController],
  providers: [CommentsService, PostsService],
})
export class CommentsModule {}
