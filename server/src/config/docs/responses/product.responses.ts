import { HttpStatus } from '@nestjs/common';
import type { SwaggerApiResponse } from '..';
import { product } from '../swagger.entity';

export const responses = {
  getAll: {
    operation: { summary: 'Get all products' },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: {
          products: [product],
          length: 1,
        },
      },
    },
  },
  byId: {
    operation: { summary: 'Get product by id' },
    param: {
      name: 'id',
      type: 'number',
      example: product.id,
    },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: product,
      },
    },
  },
  bySlug: {
    operation: { summary: 'Get product by slug' },
    param: {
      name: 'slug',
      type: 'string',
      example: product.slug,
    },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: product,
      },
    },
  },
  byCategorySlug: {
    operation: { summary: 'Get products by category slug' },
    param: {
      name: 'slug',
      type: 'string',
      example: product.slug,
    },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: [product],
      },
    },
  },
  similar: {
    operation: { summary: 'Get similar products by product id' },
    param: {
      name: 'id',
      type: 'number',
      example: product.id,
    },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: [product],
      },
    },
  },
  create: {
    operation: { summary: 'Create product (only for auth)' },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: {
          id: 2,
          name: '',
          slug: '',
          description: '',
          sold: 0,
          quantity: 0,
          price: 0,
          userId: 1,
        },
      },
    },
  },
  delete: {
    operation: {
      summary:
        'Delete product by id (only for product owner or user with admin role)',
    },
    param: {
      name: 'id',
      type: 'number',
      example: product.id,
    },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: product,
      },
    },
  },
  update: {
    operation: {
      summary:
        'Update product (only for product owner or user with admin role)',
    },
    param: {
      name: 'id',
      type: 'number',
      example: product.id,
    },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: {
          ...product,
          name: 'Toy Car',
          slug: 'toy-car',
        },
      },
    },
  },
} satisfies Record<string, SwaggerApiResponse>;
