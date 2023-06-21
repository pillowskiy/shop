import { Prisma } from '@prisma/client';

export const userSelect: Prisma.UserSelect = {
  createdAt: true,
  id: true,

  email: true,
  name: true,
  avatarURL: true,
  phone: true,
  password: false,

  orders: false,

  birthDate: true,
  aboutMe: true,

  gender: true,
  roles: true,
};

export { productSelect } from '../product/prisma.partials';
