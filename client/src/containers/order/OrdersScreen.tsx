import type {FC} from 'react';

import {useQuery} from "@tanstack/react-query";
import {useAuth} from "@hooks/useAuth";

import OrderService from "@api/services/order.service";

import AuthProvider from "@providers/AuthProvider";

import {EmptyItems} from "@containers/EmptyItems";
import {Main} from "@containers/Main";
import {Meta} from "@containers/Meta";

import {OrderOverviewCard} from "@containers/order/cards/overview/OrderOverviewCard";
import {OrderBreadcrumbCard} from "@containers/order/cards/overview/OrderBreadcrumbCard";
import {useState} from "react";
import {orderDateFilter} from "@containers/order/constant";

export const OrdersScreen: FC = () => {
    const {user} = useAuth();
    const [filter, setFilter] = useState<keyof typeof orderDateFilter>("all");

    const {data: orders} = useQuery(['get orders'], () => {
        return OrderService.getOrders();
    }, {
        select: ({data}) => data,
        enabled: !!user
    });

    return (
        <Meta title="Orders">
            <AuthProvider forAuth={true}>
                <Main className="min-h-screen-64">
                    {!!orders?.length && (
                        <OrderBreadcrumbCard filter={filter} setFilter={(newValue) => setFilter(newValue)}/>
                    )}
                    {
                        !orders?.length ?
                            <EmptyItems>There are not orders yet.</EmptyItems> :
                            orders
                                .filter(order => new Date(order.createdAt) >= orderDateFilter[filter])
                                .map((order, index) => (
                                    <OrderOverviewCard key={order.id} order={order} defaultOpen={!index}/>
                                ))
                    }
                </Main>
            </AuthProvider>
        </Meta>
    );
};