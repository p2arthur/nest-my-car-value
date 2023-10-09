import { createParamDecorator } from '@nestjs/common/decorators/http';
import { ExecutionContext } from '@nestjs/common/interfaces';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    const loggedUserId = session.userId;
    console.log(loggedUserId);
    return request.currentUser;
  },
);
