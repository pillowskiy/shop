import { BadRequestException, type ValidationError } from '@nestjs/common';

export const exceptionFactory = (errors: ValidationError[]) => {
  const validationErrors: Record<string, string> = {};
  errors.forEach(({ property, constraints }) => {
    if (!constraints) return;
    const [errorMessage] = Object.values(constraints);
    if (errorMessage) {
      validationErrors[property] = errorMessage;
    }
  });
  return new BadRequestException({ errors: validationErrors });
};
