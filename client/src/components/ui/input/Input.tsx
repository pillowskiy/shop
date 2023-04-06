import classNames from 'clsx';
import { forwardRef } from 'react';
import type { IInputProps } from './types';

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ children, className, error, title, Icon, ...props }, ref) => {
    return (
      <div className={classNames('mb-2', className)}>
        <label htmlFor="">
          {Icon && <Icon className="ml-2" />}
          <span className='block mt-2'>{title}</span>
          <input
            {...props}
            ref={ref}
            className={classNames(
              'w-full rounded px-2 py-2 text-base outline-none border border-black focus:border-primary transition-all',
              {
                'border-red': !!error,
              },
            )}
          />
        </label>
        {error && <div className="text-xs text-red">{error}</div>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export default Input;
