import { HttpStatus } from '@nestjs/common';
import type { SwaggerApiResponse } from '..';
import { jwt, user } from '../swagger.entity';

const authResponseType: SwaggerApiResponse['response'] = {
  status: HttpStatus.OK,
  schema: {
    type: 'AuthResponse',
    example: {
      user: user,
      ...jwt,
    },
  },
};

export const responses = {
  login: {
    operation: { summary: 'Login to system' },
    body: {
      schema: {
        type: 'object',
        example: {
          email: user.email,
          password: '123456',
        },
      },
    },
    response: authResponseType,
  },
  register: {
    operation: { summary: 'Register new user in our service' },
    body: {
      schema: {
        type: 'object',
        example: {
          name: user.name,
          email: user.email,
          password: '123456',
        },
      },
    },
    response: authResponseType,
  },
  refresh: {
    operation: { summary: 'Refresh jwt tokens from refresh' },
    response: authResponseType,
  },
  logout: {
    operation: { summary: 'Logout from system' },
    response: {
      status: HttpStatus.OK,
      schema: {
        example: {
          refreshToken: jwt.refreshToken,
        },
      },
    },
  },
} satisfies Record<string, SwaggerApiResponse>;
