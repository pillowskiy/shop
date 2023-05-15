import type {FC} from 'react';
import {ProductItem} from "@containers/cards/product/ProductItem";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import CategoryService from "@api/services/category.service";
import {CategoryItem} from "@containers/cards/category/CategoryItem";

export const PopularCategories: FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const {data: categories} = useQuery(['get categories'], () => {
        return CategoryService.getAll();
    }, {
        select: ({data}) => data,
        onSuccess: () => setTimeout(() => setIsLoaded(true), 250),
    });

    return (
        <section className="h-fit w-full grid grid-cols-1 md:grid-cols-4 gap-4 box-border">
            {categories?.length ?
                categories.slice(0, 4).map(category => (
                    <CategoryItem key={category.id} category={category}/>
                )) :
                <div>There are not products yet!</div>
            }
        </section>
    );
};