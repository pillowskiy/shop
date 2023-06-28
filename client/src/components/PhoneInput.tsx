"use client";
import type {FC} from 'react';
import LibPhoneInput, {PhoneInputProps as LibPhoneInputProps} from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {cn} from "@lib/utils";

interface PhoneInputProps extends LibPhoneInputProps {
    className?: string;
}

export const PhoneInput: FC<PhoneInputProps> = ({ className, ...props }) => {
    return (
        <div className={cn("flex flex-col space-y-1.5", className)}>
            <label className="text-sm font-medium">
                Phone number
            </label>
            <div className="relative bg-white rounded-lg">
                <LibPhoneInput
                    inputStyle={{
                        height: "2.5rem",
                        width: "100%",
                        background: "transparent",
                        outline: "none",
                        borderRadius: "6px",
                        border: "1px solid var(--input)"
                    }}
                    dropdownStyle={{
                        borderRadius: "6px",
                    }}
                    buttonStyle={{
                        borderRadius: "6px",
                        border: "1px solid var(--input)"
                    }}
                    inputClass={cn(
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                    country='gb'
                    {...props}
                />
            </div>
        </div>
    );
};