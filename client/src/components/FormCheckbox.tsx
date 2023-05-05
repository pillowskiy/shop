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
        <div className={cn(className, "items-top space-x-2 mb-4")}>
            <Checkbox id={id} className="float-left" {...props} />
            <div className="grid gap-1.5 leading-none px-2">
                <label
                    htmlFor={id}
                    className={cn(
                        "text-xs text-muted-foreground leading-none",
                        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    )}
                >
                    {children}
                </label>
            </div>
        </div>
    );
};