import { Role } from '@prisma/client';

export const matchRoles = (roles: Role[], userRoles: Role[] = []): boolean => {
  return roles.every((role) => userRoles.indexOf(role) !== -1);
};
