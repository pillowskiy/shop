import type {FC} from 'react';

import {useQuery} from "@tanstack/react-query";
import {useAuth} from "@hooks/useAuth";

import OrderService from "@api/services/order.service";

import AuthProvider from "@providers/AuthProvider";

import {EmptyItems} from "@containers/EmptyItems";
import {Main} from "@containers/Main";
import {Meta} from "@containers/Meta";

import {OrdersTable} from "@containers/order/tables/OrdersTable";

export const OrdersScreen: FC = () => {
    const {user} = useAuth();
    const {data: orders} = useQuery(['get orders'], () => {
        return OrderService.getOrders();
    }, {
        select: ({data}) => data,
        enabled: !!user
    });

    return (
        <Meta title="Orders">
            <AuthProvider forAuth={true}>
                <Main className="flex relative items-center justify-center min-h-screen-64">
                    {
                        !orders?.length ?
                            <EmptyItems>There are not orders yet.</EmptyItems> :
                            <OrdersTable orders={orders}/>
                    }
                </Main>
            </AuthProvider>
        </Meta>
    );
};