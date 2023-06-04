import type {FC} from 'react';
import {Card} from "@common/Card";
import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import {useState} from "react";
import {ProductCard, ProductSkeleton} from "@containers/product/cards/catalog";

interface SimilarProductsProps {
    productId: number;
}

export const SimilarProducts: FC<SimilarProductsProps> = ({productId}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const {data: products} = useQuery(['get similar', productId], () => {
        return ProductService.getSimilar(productId);
    }, {
        select: ({data}) => data,
        onSettled: () => setTimeout(() => setIsLoaded(true), 200),
    });

    // TEMP

    if (!isLoaded) {
        return <Card className="w-full sm:w-[520px] md:w-full lg:w-[920px] xl:w-[1080px] p-4 mt-4 bg-popover overflow-x-auto">
            <h2 className="text-2xl md:text-3xl font-bold">Similar products</h2>
            <hr className="mt-2 mb-4" />
            <div className="flex gap-4 overflow-x-auto p-4 bg-white rounded-lg w-ful borderl">
                {
                    Array.from({length: 6}, (_, index) => (
                        <ProductSkeleton key={index}/>
                    ))
                }
            </div>
        </Card>
    }

    return (
        <Card className="w-full sm:w-[520px] md:w-full lg:w-[920px] xl:w-[1080px] p-4 mt-4 bg-popover overflow-x-auto">
            <h2 className="text-2xl md:text-3xl font-bold">Similar products</h2>
            <hr className="mt-2 mb-4" />
            <div className="flex gap-4 overflow-x-auto p-4 bg-white rounded-lg w-full border">
                {
                    products?.length ? (
                        products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ): (
                        <h2 className="m-auto font-medium text-xl">
                            🙅 There are not similar products yet.
                        </h2>
                    )
                }
            </div>
        </Card>
    );
};