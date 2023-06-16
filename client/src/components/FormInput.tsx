import {cn} from '@lib/utils';
import {Label} from '@radix-ui/react-label';
import {Input, type InputProps} from '@ui/Input';
import type {FC, PropsWithChildren} from 'react';
import {useId} from "react";

export interface FormInputProps extends InputProps {
    label?: string;
    error?: string;
    labelClassName?: string;
}

export const FormInput: FC<PropsWithChildren<FormInputProps>> = ({
    label,
    labelClassName,
    children,
    error,
    ...props
}) => {
    const id = useId();
    return (
        <div className="flex flex-col space-y-1.5 mt-4 w-full">
            {
                label && <Label
                    htmlFor={id}
                    className={cn("float-left font-medium text-sm", {
                        'text-destructive': error
                    }, labelClassName)}
                >{label}</Label>
            }
            <Input {...props} id={id}/>
            {error && <p className="text-xs text-destructive float-left">{error}</p>}
            {children}
        </div>
    );
};