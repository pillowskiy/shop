import { BadRequestException, ValidationError } from '@nestjs/common';

export const exceptionFactory = (errors: ValidationError[]) => {
  const validationErrors = {};
  errors.forEach((error) => {
    const { property, constraints } = error;
    validationErrors[property] = Object.values(constraints)[0];
  });
  return new BadRequestException({ errors: validationErrors });
};
