import type {FC} from 'react';
import {Card} from "@common/Card";
import {Category} from "@types/category.interface";
import {cn} from "@lib/utils";
import Image from "next/image";

interface CategoryItemProps {
    category: Category;
}

export const CategoryItem: FC<CategoryItemProps> = ({category}) => {
    return (
        <Card className={
            cn(
                "flex-1 shadow-md rounded-lg bg-popover flex h-[100px] cursor-pointer",
                "hover:scale-[1.01] hover:shadow-xl hover:bg-muted transition-all duration-200 border"
            )
        }>
            <Image
                className="h-full w-auto object-cover rounded-l-lg"
                src="https://www.ubertheme.com/wp-content/uploads/sites/3/edd/2014/06/jm-category.png"
                alt="category"
                width={400}
                height={400}
            />
            <span className="m-auto text-5xl">
                {category.name}
            </span>
        </Card>
    );
};