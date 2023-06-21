import type {FC} from 'react';
import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";
import {EmptyItems} from "@containers/EmptyItems";
import {UserProductCard} from "@containers/product";
import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import {isAxiosError} from "axios";
import {buildToast, useToast} from "@common/toast/useToast";
import {useState} from "react";
import {HorizontalSkeleton} from "@containers/product/cards/HorizontalSkeleton";
import {NotFoundScreen} from "@containers/NotFoundScreen";

interface UserProductsScreenProps {
    userId: string;
}

export const UserProductsScreen: FC<UserProductsScreenProps> = ({userId}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const {toast} = useToast();

    const {data} = useQuery([
        'get user products', userId
    ], () => {
        return ProductService.getUserProducts(+userId, {
            page: 1,
            perPage: 20,
        });
    }, {
        select: ({data}) => data,
        enabled: !!userId,
        onError: (err) => {
            toast(buildToast("error", {
                error: isAxiosError(err) ? err.response?.data.message : "Unhandled error occurred!"
            }).toast);
        },
        onSuccess: () => setTimeout(() => setIsLoaded(true), 400),
        refetchInterval: false,
    });

    if (!data && isLoaded) {
        return <NotFoundScreen errorMessage="Products not found"/>
    }

    if (!isLoaded) {
        return (
            <Main className="min-h-screen-64">
                {
                    Array.from({length: 10}, (_, index) => (
                        <HorizontalSkeleton key={index}/>
                    ))
                }
            </Main>
        )
    }

    return (
        <Meta title={"Products"}>
            <Main className="min-h-screen-64">
                {
                    !data?.length ? (
                        <EmptyItems>There are not user products yet</EmptyItems>
                    ) : data?.products.map(product => (
                        <UserProductCard key={product.id} product={product} ownerId={+userId}/>
                    ))
                }
            </Main>
        </Meta>
    );
};