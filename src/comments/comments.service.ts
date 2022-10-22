import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsService } from 'src/post/post.service';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    private postService: PostsService,
  ) {}

  async create(
    postId: number,
    createCommentDto: CreateCommentDto,
    user: number,
  ): Promise<CommentEntity> {
    createCommentDto.userId = user;

    // find post
    const post = this.postService.findOnePost(postId);

    // check if post exists
    if (!post) {
      throw new NotFoundException('Post does not exists!');
    }

    createCommentDto.postId = postId;

    const comment = this.commentRepository.create(createCommentDto);

    return await this.commentRepository.save(comment);
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
