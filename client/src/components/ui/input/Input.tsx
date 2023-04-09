import classNames from 'clsx';
import { forwardRef } from 'react';
import type { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, error, placeholder, Icon, ...props }, ref) => {
    return (
      <div className={classNames('mb-2', className)}>
        <label htmlFor="">
          <span className='block mt-2'>{placeholder}</span>
          <input
            {...props}
            ref={ref}
            placeholder={children}
            className={classNames(
              'w-full mb-6 rounded px-2 py-2 text-base outline-none border border-black transition-all',
              {
                'border-red': !!error,
                'focus:border-primary': !error,
              },
            )}
          />
        </label>
        {error && <div className="text-xs text-red mt-0.5">{error}</div>}
      </div>
    );
  },
);
Input.displayName = 'Input';
