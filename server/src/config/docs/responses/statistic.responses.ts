import { HttpStatus } from '@nestjs/common';
import type { SwaggerApiResponse } from '..';
import { order } from '../swagger.entity';

const statisticResponseExample = [
  {
    name: 'Orders',
    value: 10,
  },
  {
    name: 'Reviews',
    value: 12,
  },
  {
    name: 'Favorites',
    value: 3,
  },
  {
    name: 'Money spent',
    value: 1000,
  },
];

export const responses = {
  getByUserId: {
    operation: { summary: 'Get user statistic by him id' },
    param: {
      name: 'id',
      type: 'number',
      example: order.id,
    },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: statisticResponseExample,
      },
    },
  },
} satisfies Record<string, SwaggerApiResponse>;
