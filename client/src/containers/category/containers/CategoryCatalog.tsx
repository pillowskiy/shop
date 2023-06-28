import type {FC, PropsWithChildren} from 'react';
import type {CategoryFilter} from "@/types/category.interface";
import {useQuery} from "@tanstack/react-query";
import CategoryService from "@api/services/category.service";
import * as Catalog from "@containers/category/cards/catalog";

const CategoryContainer: FC<PropsWithChildren> = ({children}) => {
    return (
        <section className="h-fit w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 box-border">
            {children}
        </section>
    )
}

export const CategoryCatalog: FC<CategoryFilter> = ({...filterParams}) => {
    const {data: categories, isLoading} = useQuery(
        ['get categories', ...Object.values(filterParams)],
        () => CategoryService.getAll(filterParams),
        { select: ({data}) => data }
    );

    if (isLoading) {
        return (
            <CategoryContainer>
                {Array.from({length: 4}, (_, index) => (
                    <Catalog.CategorySkeleton key={index}/>
                ))}
            </CategoryContainer>
        );
    }

    return (
        <CategoryContainer>
            {!!categories?.length && categories.map(category => (
                <Catalog.CategoryCard key={category.id} category={category}/>
            ))}
        </CategoryContainer>
    );
};