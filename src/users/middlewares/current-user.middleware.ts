import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: any, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = this.usersService.findOne(userId);

      req.currentUser = user;

      next();
    }
  }
}
