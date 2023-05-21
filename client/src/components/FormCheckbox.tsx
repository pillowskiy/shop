import type {FC, PropsWithChildren} from 'react';
import {CheckboxProps} from "@radix-ui/react-checkbox";
import {Checkbox} from "@ui/Checkbox";
import {cn} from "@lib/utils";
import {useId} from "react";

export const FormCheckbox: FC<PropsWithChildren<CheckboxProps>> = (
    {children, className, ...props}
) => {
    const id = useId();
    return (
        <div className={"flex items-center space-x-2"}>
            <Checkbox id={id} className="float-left" {...props} />
            <label
                htmlFor={id}
                className={cn(
                    "text-xs text-muted-foreground leading-none",
                    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className
                )}
            >
                {children}
            </label>
        </div>
    );
};