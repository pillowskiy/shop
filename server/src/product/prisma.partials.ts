import { Prisma } from '@prisma/client';
import { categorySelect } from 'src/category/prisma.partials';
import { reviewSelect } from 'src/review/prisma.partials';

export const productSelect: Prisma.ProductSelect = {
  images: true,
  name: true,
  price: true,
  description: true,
  createdAt: true,
  slug: true,
  category: {
    select: {
      name: true,
      slug: true,
    },
  },
};

export const productFullestSelect: Prisma.ProductSelect = {
  ...productSelect,
  reviews: {
    select: reviewSelect,
  },
  category: {
    select: categorySelect,
  },
};
