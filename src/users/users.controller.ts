import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;

    const user = await this.authService.signup(email, password);

    return user;
  }

  @Post('signin')
  signin() {
    this.authService.signin();
  }

  @Post('logout')
  logout() {
    this.authService.logout();
  }
}
