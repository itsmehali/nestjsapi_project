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
    @InjectRepository(PostEntity) private readonly repo: Repository<PostEntity>,
  ) {}

  async createPost(postDto: CreatePostDto, user: number): Promise<PostEntity> {
    console.log(postDto, 'postdto');
    console.log(user, 'service user');

    postDto.userId = user;

    const post = this.repo.create(postDto);

    console.log(postDto);

    //post.userId = user;
    return await this.repo.save(post);
  }

  async findAllPosts(title: string) {
    return await this.repo.find({ where: { title } });
  }

  async findOnePost(id: number): Promise<PostEntity> {
    if (!id) {
      return null;
    }

    return await this.repo.findOne({ where: { id } });
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
    return this.repo.save(post);
  }

  async deleteOnePost(id: number, user: number): Promise<DeleteResult> {
    const post = await this.findOnePost(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== user) {
      throw new UnauthorizedException('You do not have access to do that!');
    }

    return this.repo.delete(id);
  }
}
