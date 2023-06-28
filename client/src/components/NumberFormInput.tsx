"use client";
import type {FC} from 'react';
import {Minus, Plus} from "lucide-react";
import {FormInput, type FormInputProps} from "@components/FormInput";
import {cn} from "@lib/utils";

interface NumberFormInput extends FormInputProps {
    setValue: (value: number) => void;
    value: number;
    step: number;
    label?: string;
    min?: number;
    max?: number;
}

export const NumberFormInput: FC<NumberFormInput> = ({className, step, value, setValue, min = 0, max = Infinity, ...props}) => {
    const validateValue = (newValue: string): number => {
        if (!newValue.length) return min;
        const mutatedValue = +newValue
            .toString()
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*)\./g, '$1');
        if (mutatedValue < min || mutatedValue > max) return value;
        return mutatedValue;
    }

    return (
        <div className="flex items-center relative">
            <button
                className="py-3 h-10 px-1.5 rounded-lg cursor-pointer absolute left-0 bottom-0"
                onClick={() => setValue(value - step)}
                disabled={value <= min}
            >
                <Minus className={cn("w-4 h-4 transition-all", value <= min && "opacity-30 cursor-default")}/>
            </button>
            <FormInput
                type="number"
                step={step}
                labelClassName="text-xs text-center md:text-left select-none"
                value={value.toString()}
                onChange={({target}) => setValue(+validateValue(target.value))}
                className={cn("bg-white text-center", className)}
                {...props}
            />
            <button
                className="py-3 h-10 px-1.5 rounded-lg cursor-pointer absolute right-0 bottom-0"
                onClick={() => setValue(value + step)}
                disabled={value >= max}
            >
                <Plus className={cn("w-4 h-4 transition-all", value >= max && "opacity-80 cursor-default")}/>
            </button>
        </div>
    );
};