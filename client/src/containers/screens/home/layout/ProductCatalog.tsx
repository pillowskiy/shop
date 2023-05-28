import type {FC} from 'react';
import {Catalog} from "@containers/product";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import {Filter} from "@/types/product.interface";

export const ProductCatalog: FC<Filter> = ({...filterParams}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const {data} = useQuery(['get products', ...Object.keys(filterParams)], () => {
        return ProductService.getAll(filterParams);
    }, {
        select: ({data}) => data,
        onSuccess: () => setTimeout(() => setIsLoaded(true), 250),
    });

    if (!isLoaded) {
        return (
            <section className="h-fit w-full flex flex-wrap gap-4 box-border">
                {Array.from({length: 8}, () => (
                    <Catalog.ProductSkeleton key={Date.now() * Math.random()}/>
                ))}
            </section>
        )
    }

    return (
        <section className="h-fit w-full flex flex-wrap gap-4 box-border">
            {data?.products ?
                data.products.map(product => (
                    <Catalog.ProductCard key={product.id} product={product}/>
                )) :
                <div>There are not products yet!</div>
            }
        </section>
    );
};