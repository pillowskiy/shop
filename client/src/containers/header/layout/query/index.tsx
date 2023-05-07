import type {FC, HTMLAttributes} from "react";
import {
    Calculator,
    Calendar,
    Smile,
} from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@common/Command";
import {cn} from "@lib/utils";
import {useComponentVisible} from "@hooks/useComponentVisible";

interface QueryInputProps extends HTMLAttributes<HTMLFormElement> {
}

export const QueryInput: FC<QueryInputProps> = ({
    className,
    ...props
}) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible();

    return (
        <form className={cn(className, "transition-all")} {...props}>
            <div className="relative">
                <Command
                    ref={ref}
                    className="rounded-lg border shadow-md w-full z-20"
                >
                    <CommandInput
                        autoComplete="off"
                        placeholder="Type a category or search..."
                        onFocus={() => setIsComponentVisible(true)}
                    />
                    {
                        isComponentVisible &&
                        <CommandList
                            className="absolute w-full h-auto border shadow-md top-full mt-1 rounded-lg bg-popover"
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
                    }
                </Command>
            </div>
        </form>
    )
}