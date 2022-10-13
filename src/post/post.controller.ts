import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { DeleteResult } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostEntity } from './post.entity';
import { PostsService } from './post.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { PostDto } from './dto/post.dto';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/user.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(PostDto)
  async createPost(
    @Body() body: CreatePostDto,
    @CurrentUser() user: User,
  ): Promise<PostEntity> {
    return await this.postsService.createPost(body, user);
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
