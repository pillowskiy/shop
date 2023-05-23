import {type FC, useId} from 'react';
import type {SwitchProps} from "@radix-ui/react-switch";
import {Label} from "@ui/Label";
import {Switch} from "@ui/Switch";

interface FormSwitchProps extends SwitchProps {
    label: string;
}

export const FormSwitchBox: FC<FormSwitchProps> = ({label, ...props}) => {
    const id = useId();
    return (
        <div className="flex items-center space-x-2 mt-2">
            <Label htmlFor={id}>{label}</Label>
            <Switch id={id} {...props} />
        </div>
    );
};