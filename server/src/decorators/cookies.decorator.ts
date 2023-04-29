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
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);
