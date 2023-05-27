import type {FC} from 'react';
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import CategoryService from "@api/services/category.service";
import {Catalog} from "@containers/category";

export const PopularCategories: FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const {data: categories} = useQuery(['get categories'], () => {
        return CategoryService.getAll();
    }, {
        select: ({data}) => data,
        onSuccess: () => setTimeout(() => setIsLoaded(true), 250),
    });

    if (!isLoaded) {
        return (
            <section className="h-fit w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 box-border">
                {Array.from({length:4}, () => (
                    <Catalog.CategorySkeleton key={Date.now() * Math.random()}/>
                ))}
            </section>
        );
    }

    // TEMP slice (pagination on backend)
    return (
        <section className="h-fit w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 box-border">
            {categories?.length ?
                categories.slice(0, 4).map(category => (
                    <Catalog.CategoryCard key={category.id} category={category}/>
                )) :
                null
            }
        </section>
    );
};