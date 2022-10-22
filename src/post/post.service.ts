import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async createPost(postDto: CreatePostDto, user: number): Promise<PostEntity> {
    postDto.userId = user;

    const post = this.postsRepository.create(postDto);

    return await this.postsRepository.save(post);
  }

  async findAllPosts(title: string) {
    return await this.postsRepository.find({ where: { title } });
  }

  async findOnePost(id: number): Promise<PostEntity> {
    if (!id) {
      return null;
    }

    return await this.postsRepository.findOne({ where: { id } });
  }

  async updatePost(
    id: number,
    attrs: Partial<PostEntity>,
    user: number,
  ): Promise<PostEntity> {
    const post = await this.findOnePost(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== user) {
      throw new UnauthorizedException('You do not have access to do that!');
    }

    Object.assign(post, attrs);
    return this.postsRepository.save(post);
  }

  async deleteOnePost(id: number, user: number): Promise<DeleteResult> {
    const post = await this.findOnePost(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== user) {
      throw new UnauthorizedException('You do not have access to do that!');
    }

    return this.postsRepository.delete(id);
  }
}
