import {
  createParamDecorator,
  UnauthorizedException,
  type ExecutionContext,
} from '@nestjs/common';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CookieEmptyPipe implements PipeTransform<string, string> {
  transform(value: unknown): string {
    if (!value || typeof value !== 'string') {
      throw new UnauthorizedException('User is not authorized');
    }
    return value;
  }
}

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req.cookies?.[data] : req.cookies;
  },
);
