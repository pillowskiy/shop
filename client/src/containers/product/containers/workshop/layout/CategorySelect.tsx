import {type FC, useState} from 'react';
import {Button} from "@ui/Button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@common/DropdownMenu";
import {ChevronDown} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import CategoryService from "@api/services/category.service";
import {cn} from "@lib/utils";

export const CategorySelect: FC = () => {
    const [checked, setChecked] = useState<boolean>(true);

    const {data: categories, isLoading} = useQuery(['get categories'], () => {
        return CategoryService.getAll();
    }, {
        select: ({data}) => data
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={!categories?.length || isLoading}>
                <Button className="w-full flex justify-between bg-white text-foreground font-normal">
                    <p>Categories</p>
                    <ChevronDown className="w-4 h-4"/>
                </Button>
            </DropdownMenuTrigger>
                <DropdownMenuContent
                    className={cn(
                        "absolute translate-x-[-50%] transition-none",
                        "w-[var(--radix-dropdown-menu-trigger-width)] bg-white"
                    )}
                >
                    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuCheckboxItem
                        checked={checked}
                        onCheckedChange={setChecked}
                    >
                        Status Bar
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={checked}
                        onCheckedChange={setChecked}
                        disabled
                    >
                        Activity Bar
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={checked}
                        onCheckedChange={setChecked}
                    >
                        Panel
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
        </DropdownMenu>
    );
};