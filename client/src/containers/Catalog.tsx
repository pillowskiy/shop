import type {FC} from 'react';
import {ProductItem} from "@containers/cards/product/ProductItem";
import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";

export const Catalog: FC = () => {
    const {data} = useQuery(['get all products'], () => {
        return ProductService.getAll({
            page: 1,
            perPage: 10
        });
    }, {select: ({data}) => data});

    return (
        <section className="h-fit w-full flex flex-wrap mt-4 gap-4 box-border">
            {   data?.products ?
                data.products.map(product => (
                    <ProductItem key={product.id} product={product}/>
                )) :
                <div>There are not products yet!</div>
            }
        </section>
    );
};