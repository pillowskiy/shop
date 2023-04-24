import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { matchRoles } from 'src/utils/Util';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', ctx.getHandler());
    if (!roles) return true;

    const { user } = ctx.switchToHttp().getRequest();
    return matchRoles(roles, user?.roles);
  }
}
