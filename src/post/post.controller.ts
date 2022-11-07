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
  Session,
  UseInterceptors,
  UploadedFile,
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
import { ApiBasicAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Serialize(PostDto)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @Body() body: CreatePostDto,
    @CurrentUser() user: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreatePostDto> {
    console.log(file);

    if (file) body.image = file.filename;
    // if (file) {
    //   body.image = file.filename;
    //   console.log(body);
    // }

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

  @UseGuards(AuthGuard)
  @Serialize(UpdatePostDto)
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBasicAuth()
  @ApiOkResponse({ description: 'Post is updated' })
  @ApiBody({ type: UpdatePostDto })
  async updatePost(
    @Param('id') id: string,
    @Body() body: UpdatePostDto,
    @CurrentUser() user: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) body.image = file.filename;

    return await this.postsService.updatePost(+id, body, user);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deletePost(
    @Param('id') id: string,
    @CurrentUser() user: number,
  ): Promise<DeleteResult> {
    // + converts from string to int
    return await this.postsService.deleteOnePost(+id, user);
  }
}
