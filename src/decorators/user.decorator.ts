import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!request.user)
      throw new BadRequestException(
        'Usuário não encontrado no Request, utilize o AuthGuard para acessa-lo!',
      );
    if (filter) return request.user[filter];
    return request.user;
  },
);
