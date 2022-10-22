import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsService } from 'src/post/post.service';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
    private postsService: PostsService,
  ) {}

  async create(
    postId: number,
    createCommentDto: CreateCommentDto,
    user: number,
  ): Promise<CommentEntity> {
    createCommentDto.userId = user;

    // find post
    const post = this.postsService.findOnePost(postId);

    // check if post exists
    if (!post) {
      throw new NotFoundException('Post does not exists!');
    }

    createCommentDto.postId = postId;

    const comment = this.commentsRepository.create(createCommentDto);

    return await this.commentsRepository.save(comment);
  }

  async findAll(comment: string) {
    return await this.commentsRepository.find({ where: { comment } });
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }

    return await this.commentsRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    attrs: Partial<CommentEntity>,
    user: number,
  ): Promise<CommentEntity> {
    const comment = await this.findOne(id);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== user) {
      throw new UnauthorizedException('You do not have access to do that!');
    }

    Object.assign(comment, attrs);
    return this.commentsRepository.save(comment);
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
