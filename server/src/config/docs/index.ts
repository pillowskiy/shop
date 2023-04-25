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
