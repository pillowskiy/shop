import type {FC} from 'react';

import {isAxiosError} from "axios";

import {useQuery} from "@tanstack/react-query";
import {buildToast, useToast} from "@common/toast/useToast";

import ProductService from "@api/services/product.service";

import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";
import {Loader} from "@containers/Loader";

import {OverviewProductCard} from "./cards/overview/OverviewProductCard";
import {ProductReviewCard} from "@containers/review";
import {SimilarProducts} from "@containers/product/cards/SimilarProducts";
import {NotFoundScreen} from "@containers/NotFoundScreen";

interface ProductScreenProps {
    slug: string;
}

export const ProductScreen: FC<ProductScreenProps> = ({slug}) => {
    const {toast} = useToast();

    const {data: product, isLoading} = useQuery([
        'get product by slug', slug
    ], () => {
        return ProductService.getByValue("slug", slug);
    }, {
        select: ({data}) => data,
        enabled: !!slug,
        onError: (err) => {
            toast(buildToast("error", {
                error: isAxiosError(err) ? err.response?.data.message : "Unhandled error occurred!"
            }).toast);
        },
        refetchInterval: false,
    });

    if (!product && !isLoading) {
        return <NotFoundScreen errorMessage="Products not found"/>
    }

    if (!product && isLoading) {
        return <Loader/>
    }

    return (
        <Meta title={product.name || "Product"}>
            <Main className="flex flex-col relative items-center min-h-screen-64 h-auto">
                <OverviewProductCard product={product}/>
                <ProductReviewCard productId={product.id}/>
                <SimilarProducts productId={product.id} />
            </Main>
        </Meta>
    );
};