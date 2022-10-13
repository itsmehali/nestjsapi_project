import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/* 
    Custom decorator for returning the user
    who has session ID
*/

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  },
);
