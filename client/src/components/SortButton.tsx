import type {FC} from 'react';
import {Button, ButtonProps} from "@ui/Button";
import {cn} from "@lib/utils";

interface SortButtonProps extends ButtonProps {
    value: string;
    onValueChange: (newValue: string) => void;
    children: string;
}

export const SortButton: FC<SortButtonProps> = ({value, children, className, onValueChange, ...props}) => {
    return (
        <Button
            className={cn(className, "h-8")}
            onClick={() => onValueChange(value)}
            {...props}
        >
            {children}
        </Button>
    );
};