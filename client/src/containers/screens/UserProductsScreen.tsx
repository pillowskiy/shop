import type {FC} from 'react';
import {Loader} from "@containers/Loader";
import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";
import {EmptyItems} from "@containers/EmptyItems";
import {UserProduct} from "@containers/cards/product/UserProduct";
import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import {isAxiosError} from "axios";
import {useRouter} from "next/router";
import {useToast} from "@common/toast/useToast";

interface UserProductsScreenProps {
    userId: string;
}

export const UserProductsScreen: FC<UserProductsScreenProps> = ({userId}) => {
    const router = useRouter();
    const {toast} = useToast();

    const {data} = useQuery([
        'get user products', userId
    ], () => {
        return ProductService.getUserProducts(+userId, {
            page: 1,
            perPage: 10,
        });
    }, {
        select: ({data}) => data,
        enabled: !!userId,
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

    if (!data?.length) return <Loader/>;

    return (
        <Meta title={"Products"}>
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
};