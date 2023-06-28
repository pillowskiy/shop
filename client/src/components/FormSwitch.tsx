"use client";
import {type FC, useId} from 'react';
import type {SwitchProps} from "@radix-ui/react-switch";
import {Label} from "@ui/Label";
import {Switch} from "@ui/Switch";
import {cn} from "@lib/utils";

interface FormSwitchProps extends SwitchProps {
    label: string;
}

export const FormSwitchBox: FC<FormSwitchProps> = ({label, className, ...props}) => {
    const id = useId();
    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <Label htmlFor={id}>{label}</Label>
            <Switch id={id} {...props} />
        </div>
    );
};