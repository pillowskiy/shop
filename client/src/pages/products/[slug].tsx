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

export default function Page() {
    const router = useRouter();
    const {toast} = useToast();

    const slug = getSlugFromQuery(router.query.slug)
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
            if (!data) {
                return router.replace('/');
            }
        }
    });

    if (!product) return null;

    return (
        <Meta title="Product">
            <Header/>
            <SideBar/>
            <Main className="flex relative items-center justify-center min-h-screen-64 h-auto">
                <SingleProduct product={product} />
            </Main>
        </Meta>
    );
}