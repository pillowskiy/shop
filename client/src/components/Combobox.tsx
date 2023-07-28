"use client";
import {type FC, useState} from "react";
import {Check, ChevronsUpDown} from "lucide-react";
import {Button} from "@/components/ui/Button";
import {cn} from "@/lib/utils";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@common/Command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@common/Popover";

interface ComboboxProps {
    items: {
        value: string;
        label: string;
    }[];
    placeholder: string;
    onValueChange: (search: string) => void;
    disabled?: boolean;
    className?: string;
}

export const Combobox: FC<ComboboxProps> = ({items, placeholder, onValueChange, disabled, className}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    aria-expanded={open}
                    className={cn("w-full justify-between bg-popover", className)}
                    disabled={disabled || !items.length}
                >
                    {items.find((item) => item.value === value)?.label || placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] left-0 p-0 relative">
                <Command>
                    <CommandInput
                        placeholder={placeholder}
                        autoFocus
                    />
                    <CommandEmpty>No results found</CommandEmpty>
                    <CommandGroup className="max-h-[300px] overflow-y-auto">
                        {items.map((item) => (
                            <CommandItem
                                key={item.value}
                                onSelect={() => {
                                    const newValue = item.value === value ? "" : item.value;
                                    setValue(newValue)
                                    onValueChange(newValue);
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === item.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}