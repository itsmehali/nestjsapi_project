import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/User.dto';
import { UserEntity } from './UserEntity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: any): Promise<CreateUserDto> {
    return this.userRepository.save(data);
  }

  async signin(email: string, password: string) {}

  async findUser(email: string): Promise<CreateUserDto> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    return user;
  }

  async validateUser(details: UserDto) {
    console.log('AuthService');
    console.log(details);

    const user = await this.userRepository.findOneBy({
      // at findOne use this: where: { email: details.email },
      email: details.email,
    });

    console.log(user);

    // todo: update user before returning it
    if (user) return user;

    console.log('User not found. Creating...');

    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }
}
