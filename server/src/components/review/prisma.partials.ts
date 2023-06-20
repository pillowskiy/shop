import { Prisma } from '@prisma/client';
import { userSelect } from '../auth/prisma.partials';

export const reviewSelect: Prisma.ReviewSelect = {
  id: true,
  createdAt: true,
  text: true,
  rating: true,
  attachments: true,
  user: {
    select: userSelect,
  },
  helpful: {
    select: {
      id: true,
      name: true,
    },
  },
};
