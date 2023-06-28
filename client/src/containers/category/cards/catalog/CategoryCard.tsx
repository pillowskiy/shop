import type {FC} from 'react';
import type {Category} from "@/types/category.interface";
import {Card} from "@common/Card";
import Image from "next/image";
import Link from "next/link";
import {cn} from "@lib/utils";

interface CategoryItemProps {
    category: Category;
}

export const CategoryCard: FC<CategoryItemProps> = ({category}) => {
    return (
        <Card className={
            cn(
                "flex-1 shadow-md rounded-lg bg-popover cursor-pointer animate-catalog-mount",
                "hover:scale-[1.01] hover:shadow-xl hover:bg-muted transition-all duration-200 border"
            )
        }>
            <Link className="flex h-[100px]" href={`categories/${category.slug}`}>
                <Image
                    className="h-full w-auto object-cover object-top rounded-l-lg"
                    src="https://www.ubertheme.com/wp-content/uploads/sites/3/edd/2014/06/jm-category.png"
                    alt="category"
                    width={400}
                    height={400}
                />
                <span className="m-auto text-5xl">
                    {category.name}
                </span>
            </Link>
        </Card>
    );
};