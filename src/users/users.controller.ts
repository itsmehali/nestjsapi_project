import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get('/currentuser')
  currentLoggedInUser() {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;

    const user = await this.authService.signup(email, password);

    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;

    const user = await this.authService.signin(email, password);

    session.userId = user.id;

    return user;
  }

  @Post('logout')
  async logout(@Session() session: any) {
    session.userId = null;
  }
}
