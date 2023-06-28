import type {FC} from 'react';

import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";
import {Loader} from "@containers/Loader";
import {Carousel} from "@containers/swiper/Carousel";
import * as Catalog from "@containers/category/cards/catalog";
import {NotFoundScreen} from "@containers/NotFoundScreen";

import {useQuery} from "@tanstack/react-query";
import CategoryService from "@api/services/category.service";

export const CategoryScreen: FC = () => {
    const {data: categories, isLoading} = useQuery(['get categories'], () => {
        return CategoryService.getAll();
    }, {
        select: ({data}) => data,
        refetchInterval: false,
    });

    if (!categories?.length && !isLoading) {
        return <NotFoundScreen errorMessage="Categories not found"/>
    }

    if (!categories && isLoading) {
        return <Loader/>
    }

    return (
        <Meta title="Categories">
            <Main className="min-h-screen-64">
                <Carousel/>

                <section className="mt-4 h-fit w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 box-border">
                    {categories.map(category => (
                        <Catalog.CategoryCard key={category.id} category={category}/>
                    ))}
                </section>
            </Main>
        </Meta>
    );
};