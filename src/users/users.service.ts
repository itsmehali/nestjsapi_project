import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(email: string, password: string) {
    const user = this.usersRepository.create({ email, password });

    return this.usersRepository.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }

    return this.usersRepository.findOne({ where: { id } });
  }

  find(email: string) {
    return this.usersRepository.find({ where: { email } });
  }

  async update(
    id: number,
    attrs: Partial<User>,
    loggedInUser: number,
  ): Promise<UpdateUserDto> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id !== loggedInUser) {
      throw new UnauthorizedException('You do not have access to do that!');
    }

    Object.assign(user, attrs);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.remove(user);
  }
}
