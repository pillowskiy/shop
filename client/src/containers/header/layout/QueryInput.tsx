import type {FC, HTMLAttributes} from "react";
import {
    Command,
    CommandInput,
} from "@common/Command";
import {cn} from "@lib/utils";
import {useComponentVisible} from "@hooks/useComponentVisible";
import {QueryList} from "@containers/header/layout/QueryList";

interface QueryFormProps extends HTMLAttributes<HTMLFormElement> {}

export const QueryInput: FC<QueryFormProps> = ({
    className,
    ...props
}) => {
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible();

    return (
        <form className={cn(className, "transition-all relative")} {...props}>
            <Command
                ref={ref}
                className="rounded-lg border shadow-md w-full"
            >
                <CommandInput
                    autoComplete="off"
                    placeholder="Type a category or search..."
                    onFocus={() => setIsComponentVisible(true)}
                />
                { isComponentVisible && <QueryList /> }
            </Command>
        </form>
    )
}