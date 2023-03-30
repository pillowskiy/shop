import { Prisma } from '@prisma/client';

export const userSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  name: true,
  avatarURL: true,
  phone: true,
};

export const productSelect: Prisma.ProductSelect = {
  id: true,
  name: true,
  price: true,
  images: true,
  slug: true,
};
