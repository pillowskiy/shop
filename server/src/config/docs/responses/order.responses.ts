import { HttpStatus } from '@nestjs/common';
import type { SwaggerApiResponse } from '..';
import { order } from '../swagger.entity';

export const responses = {
  getByUserId: {
    operation: { summary: "Get user's orders by userId (only for auth users)" },
    param: {
      name: 'id',
      type: 'number',
      example: order.id,
    },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: order,
      },
    },
  },
} satisfies Record<string, SwaggerApiResponse>;
