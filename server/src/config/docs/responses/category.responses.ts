import { HttpStatus } from '@nestjs/common';
import type { SwaggerApiResponse } from '..';
import { category } from '../swagger.entity';

const categoryResponseType: SwaggerApiResponse['response'] = {
  status: HttpStatus.OK,
  schema: {
    type: 'CategoryResponse',
    example: category,
  },
};

export const responses = {
  all: {
    operation: { summary: 'Get all categories' },
    response: categoryResponseType,
  },
  byId: {
    operation: { summary: 'Get category by id' },
    param: {
      name: 'id',
      type: 'number',
      example: category.id,
    },
    response: categoryResponseType,
  },
  bySlug: {
    operation: { summary: 'Get category by slug' },
    param: {
      name: 'slug',
      type: 'string',
      example: category.slug,
    },
    response: categoryResponseType,
  },
  create: {
    operation: { summary: 'Create category (only for admins)' },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: {
          example: {
            id: 1,
            name: '',
            slug: '',
          },
        },
      },
    },
  },
  delete: {
    operation: { summary: 'Delete category by id' },
    param: {
      name: 'id',
      type: 'number',
      example: category.id,
    },
    response: categoryResponseType,
  },
  update: {
    operation: { summary: 'Update category by id' },
    param: {
      name: 'id',
      type: 'number',
      example: category.id,
    },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: {
          ...category,
          name: 'Digital Music',
          slug: 'digital-music',
        },
      },
    },
  },
} satisfies Record<string, SwaggerApiResponse>;
