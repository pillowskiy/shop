import { type ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ServerUrl = createParamDecorator(
  (_, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    return `${req.protocol}://${req.get('host')}/api`;
  },
);
