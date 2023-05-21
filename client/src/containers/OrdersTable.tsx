import type {FC} from 'react';
import type {Order} from "@/types/order.interface";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@common/Table"

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
                    <TableHead>Items Count</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>{order.items.length}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};