//This interceptor is depprecated cause we need to apply the currentUser propertie to the request before any @Guards run, for that we changed this interceptor to a middleware

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { UserService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}
