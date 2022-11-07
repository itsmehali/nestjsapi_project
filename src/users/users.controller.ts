import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from './decorators/currentUser.decorator';
import { User } from './user.entity';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums/role.enum';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/currentuser')
  @ApiOkResponse({ description: 'Current logged in user' })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  currentLoggedInUser(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  @ApiCreatedResponse({ description: 'User Created' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;

    const user = await this.authService.signup(email, password);

    //session.userId = user.id;

    return user;
  }

  @Post('/signin')
  @ApiOkResponse({ description: 'User logged in' })
  @ApiBody({ type: CreateUserDto })
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;

    const user = await this.authService.signin(email, password);

    session.userId = user.id;

    return user;
  }

  @Post('/logout')
  @ApiCookieAuth()
  @ApiCreatedResponse({ description: 'User is logged out' })
  async logout(@Session() session: any) {
    session.userId = null;
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  @ApiOkResponse({ description: 'User updated' })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @CurrentUser() user: number,
  ): Promise<UpdateUserDto> {
    return await this.usersService.update(+id, body, user);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  async deleteUser() {
    console.log('Only admin can hit this route!');
  }
}
