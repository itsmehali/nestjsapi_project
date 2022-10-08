import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { UserEntity } from '../UserEntity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  serializeUser(user: UserEntity, done: Function) {
    console.log('Serialize user');

    done(null, user);
  }

  async deserializeUser(payload: UserEntity, done: Function) {
    const user = await this.authService.findUser(payload.id);
    console.log('Deserialize User');
    console.log(user);

    return user ? done(null, user) : done(null, null);
  }
}
