import {forwardRef, type InputHTMLAttributes} from 'react';
import {Search, X} from "lucide-react";
import {cn} from "@lib/utils";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onClear: () => void;
}

const SearchInput = forwardRef<
    HTMLInputElement,
    SearchInputProps
    >(({ className, onClear, ...props }, ref) => (
    <div className="flex items-center border-b px-3 bg-white">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50"/>
        <input
            ref={ref}
            autoComplete="off"
            placeholder="Type a category or search..."
            className={cn(className,
                "placeholder:text-foreground-muted flex h-11 w-full rounded-md bg-transparent",
                "py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
            )}
            {...props}
        />
        <X
            className="mr-2 h-4 w-4 shrink-0 opacity-50 block md:hidden"
            onClick={onClear}
        />
    </div>
));

SearchInput.displayName = "SearchInput";

export { SearchInput }