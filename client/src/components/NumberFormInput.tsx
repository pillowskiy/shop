import type {FC} from 'react';
import {Minus, Plus} from "lucide-react";
import {FormInput, FormInputProps} from "@components/FormInput";
import {cn} from "@lib/utils";

interface NumberFormInput extends FormInputProps {
    setValue: (step: number) => void;
    value: number;
    step: number;
    label?: string;
}

export const NumberFormInput: FC<NumberFormInput> = ({className, step, value, setValue, ...props}) => {
    return (
        <div className="flex items-center relative">
            <div
                className="py-3 h-10 px-1.5 rounded-lg cursor-pointer absolute left-0 bottom-0"
                onClick={() => setValue(step * (-1))}
            >
                <Minus className="w-4 h-4"/>
            </div>
            <FormInput
                type="number"
                step={step}
                labelClassName="text-xs text-center md:text-left select-none"
                value={Math.floor(value) < value ? value.toFixed(3) : value}
                className={cn("bg-white text-center", className)}
                {...props}
            />
            <div
                className="py-3 h-10 px-1.5 rounded-lg cursor-pointer absolute right-0 bottom-0"
                onClick={() => setValue(step)}
            >
                <Plus className="w-4 h-4"/>
            </div>
        </div>
    );
};