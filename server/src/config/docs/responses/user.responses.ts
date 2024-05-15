import { HttpStatus } from '@nestjs/common';
import { SwaggerApiResponse } from '..';
import { user, product } from '../swagger.entity';

const userWithFavorites = {
  user,
  favorites: [product],
};

export const responses = {
  profile: {
    operation: { summary: 'Get user profile by him id' },
    param: {
      name: 'id',
      type: 'number',
      example: user.id,
    },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: userWithFavorites,
      },
    },
  },
  updateProfile: {
    operation: { summary: 'Update user profile (only for auth users)' },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: user,
      },
    },
  },
  toggleFavorite: {
    operation: { summary: 'Toggle favorite product (only for auth users)' },
    param: {
      name: 'id',
      type: 'number',
      example: 1,
    },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: userWithFavorites,
      },
    },
  },
} satisfies Record<string, SwaggerApiResponse>;
