import { Prisma } from '@prisma/client';

export const userSelect: Prisma.UserSelect = {
  id: true,
  name: true,
  avatarURL: true,
};

export const reviewSelect: Prisma.ReviewSelect = {
  id: true,
  createdAt: true,
  text: true,
  rating: true,
  user: {
    select: userSelect,
  },
};
