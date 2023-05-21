import {useRouter} from 'next/router';
import {Meta} from "@containers/Meta";
import {SideBar} from "@containers/aside/SideBar";
import {Main} from "@containers/Main";
import {Header} from "@containers/header/Header";
import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import {useToast} from "@common/toast/useToast";
import {isAxiosError} from "axios";
import {getSlugFromQuery} from "@lib/utils";
import {SingleProduct} from "@containers/cards/product/SingleProduct";
import {ProductReview} from "@containers/cards/review/ProductReview";

export default function Page() {
    const router = useRouter();
    const {toast} = useToast();

    // TEMP: https://github.com/vercel/next.js/discussions/11484
    const slug = getSlugFromQuery(router.query.slug);

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

    if (!product) return null;

    return (
        <Meta title={product.name || "Product"}>
            <Header/>
            <SideBar/>
            <Main className="flex flex-col relative items-center min-h-screen-64 h-auto">
                <SingleProduct product={product} />
                <ProductReview productId={product.id} />
            </Main>
        </Meta>
    );
}