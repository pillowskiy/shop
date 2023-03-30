import { Prisma } from '@prisma/client';

export const categorySelect: Prisma.CategorySelect = {
  id: true,
  name: true,
  slug: true,
};
