import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export const NumParam = createParamDecorator(
  (param: string, ctx: ExecutionContext): number => {
    const { params } = ctx.switchToHttp().getRequest<Request>();
    const value = Number(params[param]);
    if (isNaN(value)) {
      throw new BadRequestException(
        `The ${param} parameter is expected to be a number`,
      );
    }
    return value;
  },
);
