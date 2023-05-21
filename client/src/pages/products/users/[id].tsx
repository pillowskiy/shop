import {useRouter} from 'next/router';
import {Meta} from "@containers/Meta";
import {SideBar} from "@containers/aside/SideBar";
import {Main} from "@containers/Main";
import {Header} from "@containers/header/Header";
import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import {useToast} from "@common/toast/useToast";
import {isAxiosError} from "axios";
import {getStringFromQuery} from "@lib/utils";
import {EmptyItems} from "@containers/EmptyItems";
import {FavoriteProduct} from "@containers/cards/product/FavoriteProduct";
import {UserProduct} from "@containers/cards/product/UserProduct";

export default function Page() {
    const router = useRouter();
    const {toast} = useToast();

    // TEMP: https://github.com/vercel/next.js/discussions/11484
    const userId = getStringFromQuery(router.query.id);

    const {data} = useQuery([
        'get user products', userId
    ], () => {
        return ProductService.getUserProducts(+userId, {
            page: 1,
            perPage: 10,
        });
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

    if (!data?.length) return null;

    return (
        <Meta title={"Products"}>
            <Header/>
            <SideBar/>
            <Main className="min-h-screen-64">
                {
                    !data?.length ? (
                        <EmptyItems>There are not user products yet</EmptyItems>
                    ) : data?.products.map(product => (
                        <UserProduct key={product.id} product={product} ownerId={+userId}/>
                    ))
                }
            </Main>
        </Meta>
    );
}