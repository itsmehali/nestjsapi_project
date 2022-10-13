import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private readonly repo: Repository<PostEntity>,
  ) {}

  async createPost(postDto: CreatePostDto, user: User): Promise<PostEntity> {
    const post = this.repo.create(postDto);
    post.user = user;
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

  async updatePost(id: number, attrs: Partial<PostEntity>) {
    const post = await this.findOnePost(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    Object.assign(post, attrs);
    return this.repo.save(post);
  }

  deleteOnePost(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
