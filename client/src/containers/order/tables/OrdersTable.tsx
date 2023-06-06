import type {FC} from 'react';
import type {Order} from "@/types/order.interface";
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@common/Table"
import {OrderItemRow} from "@containers/order/tables/layout/OrderItemRow";

interface OrdersTableProps {
    orders: Order[];
}

export const OrdersTable: FC<OrdersTableProps> = ({orders}) => {
    return (
        <Table className="m-auto sm:w-[520px] md:w-full lg:w-[920px] xl:w-[1080px] gap-4 p-4 mt-4 bg-popover rounded-lg">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Items Count</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <OrderItemRow key={order.id} order={order} />
                ))}
            </TableBody>
        </Table>
    );
};