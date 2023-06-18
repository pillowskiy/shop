import { Prisma } from '@prisma/client';
import { categorySelect } from 'src/components/category/prisma.partials';
import { userSelect } from '../user/prisma.partials';

export const productSelect: Prisma.ProductSelect = {
  id: true,
  ownerId: true,
  images: true,
  quantity: true,
  name: true,
  price: true,
  discountPercent: true,
  finalPrice: true,
  description: true,
  createdAt: true,
  slug: true,
  categories: {
    select: categorySelect,
  },
};

export const productFullestSelect: Prisma.ProductSelect = {
  ...productSelect,
  owner: {
    select: userSelect,
  },
};
