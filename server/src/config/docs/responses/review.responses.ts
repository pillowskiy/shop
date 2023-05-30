import { HttpStatus } from '@nestjs/common';
import { SwaggerApiResponse } from '..';
import { product, review } from '../swagger.entity';
import { user } from './../swagger.entity';

const reviewResponseType: SwaggerApiResponse['response'] = {
  status: HttpStatus.OK,
  schema: {
    example: [
      {
        ...review,
        user: {
          id: user.id,
          name: user.name,
          avatarURL: user.avatarURL,
          roles: user.roles,
        },
        helpful: [
          {
            name: user.name,
          },
        ],
      },
    ],
  },
};

export const responses = {
  byProductId: {
    operation: { summary: 'Get all product reviews by him id' },
    param: {
      name: 'id',
      type: 'number',
      example: product.id,
    },
    response: reviewResponseType,
  },
  avg: {
    operation: { summary: 'Get product avg reviews rate by product id' },
    param: {
      name: 'id',
      type: 'number',
      example: product.id,
    },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: review.rating,
      },
    },
  },
  create: {
    operation: {
      summary:
        'Create a review for a specific product by him id (only for auth users)',
    },
    param: {
      name: 'id',
      type: 'number',
      example: product.id,
    },
    response: reviewResponseType,
  },
} satisfies Record<string, SwaggerApiResponse>;
