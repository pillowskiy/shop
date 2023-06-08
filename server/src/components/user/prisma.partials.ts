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
  roles: true,
};

export const productSelect: Prisma.ProductSelect = {
  id: true,
  name: true,
  price: true,
  images: true,
  slug: true,
};
