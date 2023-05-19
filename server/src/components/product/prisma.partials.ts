import { Prisma } from '@prisma/client';
import { categorySelect } from 'src/components/category/prisma.partials';
import { reviewSelect } from 'src/components/review/prisma.partials';

export const productSelect: Prisma.ProductSelect = {
  id: true,
  images: true,
  quantity: true,
  name: true,
  price: true,
  description: true,
  createdAt: true,
  slug: true,
  category: {
    select: categorySelect,
  },
};

export const productFullestSelect: Prisma.ProductSelect = {
  ...productSelect,
  reviews: {
    select: reviewSelect,
  },
};
