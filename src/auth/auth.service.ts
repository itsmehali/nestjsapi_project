import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/User.dto';
import { UserEntity } from './UserEntity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

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

  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }
}
