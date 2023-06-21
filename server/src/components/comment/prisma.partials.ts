import { Prisma } from '@prisma/client';
import { userSelect } from '../user/prisma.partials';

export const commentSelect: Prisma.CommentSelect = {
  id: true,
  author: {
    select: userSelect,
  },
  text: true,
  rating: true,
  createdAt: true,
  updatedAt: true,
};
