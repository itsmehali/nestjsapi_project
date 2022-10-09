import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  Res,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { GoogleAuthGuard } from 'src/guards/googleauth.guard';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() body: CreateUserDto) {
    const { email, password, displayName } = body;
    const hashedPassword = await bcrypt.hash(password, 12);

    return this.authService.create({
      email,
      displayName,
      password: hashedPassword,
    });
  }

  @Post('login')
  async login(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = body;

    const user = await this.authService.findUser(email);

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Wrong credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.email });

    res.cookie;

    res.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success',
    };
  }

  @Get('user')
  async user(@Req() req: Request, @Body() body: CreateUserDto) {
    try {
      const cookie = req.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const { email } = body;

      const user = await this.authService.findUser(email);

      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google authentication' };
  }

  // api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'ok' };
  }

  // @Get('status')
  // user(@Req() request: Request) {
  //   console.log(request.user);
  //   if (request.user) {
  //     return { msg: 'Authenticated' };
  //   } else {
  //     return { msg: 'Not Authenticated' };
  //   }
  // }
}
