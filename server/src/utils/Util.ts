import { Role } from '@prisma/client';

export const matchRoles = (roles: Role[], userRoles: Role[] = []): boolean => {
  return roles.every((role) => userRoles.indexOf(role) !== -1);
};

export const asyncFilter = async <T>(
  array: T[],
  condition: (
    element: T,
    index: number,
    array: Array<T>,
  ) => boolean | Promise<boolean>,
) => {
  return array.reduce(async (memo, value, index, array) => {
    return (await condition(value, index, array))
      ? (await memo).concat(value)
      : memo;
  }, []);
};
