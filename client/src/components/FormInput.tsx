import { cn } from '@lib/utils';
import { Label } from '@radix-ui/react-label';
import { Input, type InputProps } from '@ui/Input';
import type { FC, PropsWithChildren } from 'react';

interface FormInputProps extends InputProps {
  label: string;
  error?: string;
}

export const FormInput: FC<PropsWithChildren<FormInputProps>> = ({
  label,
  children,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1.5 mb-6">
      <div>
        <Label
          className={cn("float-left uppercase", {
            'text-red-500': error
          })}
        >{label} { error && '•' }</Label>
        { error && <p className="text-xs text-red-500 float-left ml-1 mt-1">{error}</p> }
      </div>
      <Input {...props} />
      {children}
    </div>
  );
};