//Interceptors run after middlewares and Guards, meaning our previous interceptor was generating a problem when we tried to use the AdminGuard as when it ran there was no CurrentUser on the request. To solve that we need to apply the current user property comming from our cookie session before the Admin guard gets executed. For that we will use a CurrentUser middleware instead

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../users.service';
import { User } from '../users.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (!userId) {
      return req;
    }

    const user = await this.userService.findOne(userId);
    req.currentUser = user;

    next();
  }
}
