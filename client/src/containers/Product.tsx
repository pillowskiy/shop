import type {FC} from 'react';
import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";
import {SingleProduct} from "@containers/cards/product/SingleProduct";
import {ProductReview} from "@containers/cards/review/ProductReview";
import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import {isAxiosError} from "axios";
import {useToast} from "@common/toast/useToast";
import {useRouter} from "next/router";
import {Loader} from "@containers/Loader";

interface ProductProps {
    slug: string;
}

const Product: FC<ProductProps> = ({slug}) => {
    const router = useRouter();
    const {toast} = useToast();

    const {data: product} = useQuery([
        'get product by slug', slug
    ], () => {
        return ProductService.getByValue("slug", slug);
    }, {
        select: ({data}) => data,
        onError: (err) => {
            console.log(err);
            toast({
                variant: "destructive",
                title: "Uh Oh! Something went wrong",
                description: isAxiosError(err) ? err.response?.data.message : "Unhandled error occurred!"
            })
        },
        onSettled: (data) => {
            if (!data) return router.back();
        },
    });

    if (!product) {
        return <Loader />
    }

    return (
        <Meta title={product.name || "Product"}>
            <Main className="flex flex-col relative items-center min-h-screen-64 h-auto">
                <SingleProduct product={product} />
                <ProductReview productId={product.id} />
            </Main>
        </Meta>
    );
};

export default Product;