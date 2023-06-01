import {type FC, useState} from 'react';
import {Button} from "@ui/Button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@common/DropdownMenu";
import {ChevronDown} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import CategoryService from "@api/services/category.service";
import {cn} from "@lib/utils";

interface CategorySelectProps {
    selectedCategories: number[];
    setCategories: (categories: number[]) => void
}

export const CategorySelect: FC<CategorySelectProps> = ({setCategories, selectedCategories}) => {
    const [selected, setSelected] = useState<Record<number, boolean>>(
        Object.fromEntries(
            selectedCategories.map(id => {
                return [id, true]
            })
        )
    );
    const {data: categories, isLoading} = useQuery(['get categories'], () => {
        return CategoryService.getAll();
    }, {
        select: ({data}) => data,
    });

    const isDisabled = !categories?.length || isLoading;

    const selectedKeys = Object.entries(selected).filter(([_, value]) => value).map(([key]) => +key);

    return (
        <DropdownMenu onOpenChange={(open) => !open && setCategories(selectedKeys)}>
            <DropdownMenuTrigger asChild disabled={isDisabled}>
                <Button
                    className="w-full flex flex-wrap gap-1 justify-start overflow-x-hidden bg-white text-foreground font-normal border py-1 h-fit mt-6"
                    disabled={isDisabled}>
                    {(!Object.values(selected).filter(Boolean).length || !categories?.length) ?
                        <p className="my-1">Categories</p> : (
                            selectedKeys.map(key => (
                                <div
                                    className="first:ml-[-8px] h-full px-2 py-1 w-fit bg-muted rounded-lg"
                                    key={key}
                                >
                                    {categories.find(category => category.id === key)?.name || "Unknown"}
                                </div>
                            ))
                        )}
                    <ChevronDown className="w-4 h-4 ml-auto"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className={cn(
                    "absolute translate-x-[-50%] overflow-y-auto bg-white",
                    "w-[var(--radix-dropdown-menu-trigger-width)] max-h-[200px]"
                )}
            >
                {categories && categories.map(category => (
                    <DropdownMenuCheckboxItem
                        key={category.id}
                        checked={Boolean(selected[category.id])}
                        onCheckedChange={() => setSelected({
                            ...selected,
                            [category.id]: !Boolean(selected[category.id])
                        })}
                    >
                        {category.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};