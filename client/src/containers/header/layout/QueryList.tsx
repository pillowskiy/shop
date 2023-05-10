import type {FC} from 'react';
import {CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator} from "@common/Command";
import {Calculator, Calendar, Smile} from "lucide-react";
import {cn} from "@lib/utils";

export const QueryList: FC = () => {
    return (
        <CommandList
            className={cn(
                "border shadow-md mt-1 rounded-lg z-20",
                "absolute w-full h-auto top-full bg-popover"
            )}
        >
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
                <CommandItem>
                    <span>1</span>
                </CommandItem>
                <CommandItem>
                    <span>2</span>
                </CommandItem>
                <CommandItem>
                    <span>3</span>
                </CommandItem>
            </CommandGroup>
            <CommandSeparator/>
            <CommandGroup heading="Settings">
                <CommandItem>
                    <Calendar className="mr-2 h-4 w-4"/>
                    <span>Baby</span>
                </CommandItem>
                <CommandItem>
                    <Smile className="mr-2 h-4 w-4"/>
                    <span>Arts & Crafts</span>
                </CommandItem>
                <CommandItem>
                    <Calculator className="mr-2 h-4 w-4"/>
                    <span>Digital Music</span>
                </CommandItem>
                <CommandItem>
                    <Calculator className="mr-2 h-4 w-4"/>
                    <span>Home & Kitchen</span>
                </CommandItem>
                <CommandItem>
                    <Calculator className="mr-2 h-4 w-4"/>
                    <span>Luggage</span>
                </CommandItem>
            </CommandGroup>
        </CommandList>
    );
};