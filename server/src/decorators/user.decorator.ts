import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';

type PublicUserKeys = 'name' | 'email' | 'avatarURL' | 'phone' | 'roles';
export type PickUser<T extends keyof PrismaUser = PublicUserKeys> = Pick<
  PrismaUser,
  T
>;

export const User = createParamDecorator(
  (data: keyof PrismaUser, ctx: ExecutionContext): Partial<PrismaUser> => {
    const { user }: { user: PickUser } = ctx.switchToHttp().getRequest();
    return data ? (user[data] as PickUser<typeof data>) : user;
  },
);
