import type{ IRegister } from '@/types';
import type { Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import * as patterns from './patterns';

export function registerInput<T extends IRegister>(
  name: keyof Pick<T, keyof typeof patterns>,
  register: UseFormRegister<T>,
  options?: RegisterOptions<T, Path<T>>,
) {
  // TEMP!
  // @ts-ignore
  // Type 'username' is not assignable to type 'Path<T>'.
  // TEMP!
  return register(name, {
    required: 'This field is required',
    pattern: {
      value: patterns[name],
      message: `Please enter a valid ${name}`,
    },
    ...options
  });
}