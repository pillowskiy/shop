import type {FC} from 'react';
import {ProductItem} from "@containers/cards/product/ProductItem";
import {ProductItemSkeleton} from "@containers/cards/product/ProductItemSkeleton";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import {Filter} from "@/types/product.interface";

export const Catalog: FC<Filter> = ({...filterOptions}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const {data} = useQuery(['get products', ...Object.keys(filterOptions)], () => {
        return ProductService.getAll(filterOptions);
    }, {
        select: ({data}) => data,
        onSuccess: () => setTimeout(() => setIsLoaded(true), 250),
    });

    if (!isLoaded) {
        return (
            <section className="h-fit w-full flex flex-wrap gap-4 box-border">
                {Array.from({length: 20}, () => (
                    <ProductItemSkeleton key={Date.now() * Math.random()}/>
                ))}
            </section>
        )
    }

    return (
        <section className="h-fit w-full flex flex-wrap gap-4 box-border">
            {data?.products ?
                data.products.map(product => (
                    <ProductItem key={product.id} product={product}/>
                )) :
                <div>There are not products yet!</div>
            }
        </section>
    );
};