import type {
  ApiBodyOptions,
  ApiParamOptions,
  ApiQueryOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface SwaggerApiResponse {
  operation: Partial<OperationObject>;
  body?: ApiBodyOptions;
  param?: ApiParamOptions;
  query?: ApiQueryOptions;
  response: ApiResponseOptions | undefined;
}

export { responses as auth } from './responses/auth.responses';
export { responses as category } from './responses/category.responses';
export { responses as order } from './responses/order.responses';
