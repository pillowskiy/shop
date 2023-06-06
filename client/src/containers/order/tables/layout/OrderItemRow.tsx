import type {FC} from 'react';
import type {Order} from "@/types/order.interface";

import {TableCell, TableRow} from "@common/Table";
import {useQuery} from "@tanstack/react-query";
import OrderService from "@api/services/order.service";
import {priceFormat} from "@lib/formatter";

interface OrderItemRowProps {
    order: Order;
}

export const OrderItemRow: FC<OrderItemRowProps> = ({order}) => {
    const {data: orderItems} = useQuery(['get order items', order.id], () => {
        return OrderService.getOrderItems(order.id);
    }, {
        select: ({data}) => data
    });

    const price = (orderItems || []).reduce((prev, cur) => prev + cur.price, 0);

    return (
        <TableRow>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{priceFormat(price)}</TableCell>
            <TableCell>{orderItems?.length || 0}</TableCell>
        </TableRow>
    );
};