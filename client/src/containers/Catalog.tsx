import type {FC} from 'react';
import {ProductItem} from "@containers/cards/product/ProductItem";
import {ProductItemSkeleton} from "@containers/cards/product/ProductItemSkeleton";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";

export const Catalog: FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const {data} = useQuery(['get products'], () => {
        return ProductService.getAll({
            page: 1,
            perPage: 12,
        });
    }, {
        select: ({data}) => data,
        onSuccess: () => setTimeout(() => setIsLoaded(true), 250),
    });

    if (!isLoaded) {
        return (
            <section className="h-fit w-full flex flex-wrap mt-4 gap-4 box-border">
                {Array.from({length: 20}, () => (
                    <ProductItemSkeleton key={Date.now() * Math.random()}/>
                ))}
            </section>
        )
    }

    return (
        <section className="h-fit w-full flex flex-wrap mt-4 gap-4 box-border">
            {data?.products ?
                data.products.map(product => (
                    <ProductItem key={product.id} product={product}/>
                )) :
                <div>There are not products yet!</div>
            }
        </section>
    );
};