import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostEntity } from './post.entity';
import { PostsService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() body: CreatePostDto): Promise<PostEntity> {
    return await this.postsService.createPost(body);
  }

  @Get()
  async findAllPosts(@Query('title') title: string) {
    return await this.postsService.findAllPosts(title);
  }

  @Get('/:id')
  async findOnePost(@Param('id') id: number): Promise<PostEntity> {
    const post = await this.postsService.findOnePost(id);

    return post;
  }

  @Patch('/:id')
  async updatePost(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return await this.postsService.updatePost(+id, body);
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string): Promise<DeleteResult> {
    // + converts from string to int
    return await this.postsService.deleteOnePost(+id);
  }
}
