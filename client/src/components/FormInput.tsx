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
      <Label
        className={cn("float-left uppercase", {
          'text-destructive': error
        })}
      >{label}</Label>
      <Input {...props} />
      { error && <p className="text-xs text-destructive float-left">{error}</p> }
      {children}
    </div>
  );
};