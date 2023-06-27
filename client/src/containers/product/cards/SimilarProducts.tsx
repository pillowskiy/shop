import type {FC, PropsWithChildren} from 'react';
import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import {useState} from "react";
import {Catalog} from "@containers/product";

import {MCard} from "@common/Card";
import {opacityListAnimation} from "@lib/animations";

interface SimilarProductsProps {
    productId: number;
}

const SimilarProductsContainer: FC<PropsWithChildren> = ({children}) => {
    return (
        <MCard
            className="w-full sm:w-[520px] md:w-full lg:w-[920px] xl:w-[1080px] p-4 mt-4 bg-popover overflow-x-auto"
            initial="initial"
            animate="animate"
            custom={3}
            variants={opacityListAnimation}
        >
            {children}
        </MCard>
    )
}

export const SimilarProducts: FC<SimilarProductsProps> = ({productId}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const {data: products} = useQuery(['get similar', productId], () => {
        return ProductService.getSimilar(productId);
    }, {
        select: ({data}) => data,
        onSettled: () => setTimeout(() => setIsLoaded(true), 200),
    });

    if (!isLoaded) {
        return <SimilarProductsContainer className="w-full sm:w-[520px] md:w-full lg:w-[920px] xl:w-[1080px] p-4 mt-4 bg-popover overflow-x-auto">
            <h2 className="text-2xl md:text-3xl font-bold">Similar products</h2>
            <hr className="mt-2 mb-4" />
            <div className="flex gap-4 overflow-x-auto p-4 bg-white rounded-lg w-ful border-lg">
                {
                    Array.from({length: 6}, (_, index) => (
                        <Catalog.Skeleton.Product key={index}/>
                    ))
                }
            </div>
        </SimilarProductsContainer>
    }

    return (
        <SimilarProductsContainer className="w-full sm:w-[520px] md:w-full lg:w-[920px] xl:w-[1080px] p-4 mt-4 bg-popover overflow-x-auto">
            <h2 className="text-2xl md:text-3xl font-bold">Similar products</h2>
            <hr className="mt-2 mb-4" />
            <div className="flex gap-4 overflow-x-auto p-4 bg-white rounded-lg w-full border">
                {
                    products?.length ? (
                        products.map(product => (
                            <Catalog.Card.MProduct key={product.id} product={product} />
                        ))
                    ): (
                        <h2 className="m-auto font-medium text-xl">
                            🙅 There are not similar products yet.
                        </h2>
                    )
                }
            </div>
        </SimilarProductsContainer>
    );
};