import type {FC} from 'react';
import {ProductItem} from "@containers/cards/product/ProductItem";
import {GetAllProductsResponse} from "@/types/product.interface";

export const Catalog: FC<GetAllProductsResponse> = ({products}) => {
    return (
        <section className="h-fit w-full flex flex-wrap mt-4 gap-4 box-border">
            {   products ?
                products.map(product => (
                    <ProductItem key={product.id} product={product}/>
                )) :
                <div>There are not products yet!</div>
            }
        </section>
    );
};