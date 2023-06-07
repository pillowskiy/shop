import type {FC} from 'react';
import type {Order} from "@/types/order.interface";
import {Card} from "@common/Card";
import {useQuery} from "@tanstack/react-query";
import OrderService from "@api/services/order.service";
import {priceFormat} from "@lib/formatter";
import {ChevronDown, ChevronUp} from "lucide-react";
import {OrderStatus} from "@/types/order.interface";
import Image from "next/image";
import {useState} from "react";

interface OrderOverviewCardProps {
    order: Order;
}

const STATUS_COLOR: Record<OrderStatus, string> = {
    [OrderStatus.COMPLETED]: "bg-green-400",
    [OrderStatus.CANCELLED]: "bg-red-400",
    [OrderStatus.PENDING]: "bg-blue-400"
}

export const OrderOverviewCard: FC<OrderOverviewCardProps> = ({order}) => {
    const [isOpen, setIsOpen] = useState(false);

    const {data: orderItems} = useQuery(['get order items', order.id], () => {
        return OrderService.getOrderItems(order.id);
    }, {
        select: ({data}) => data
    });

    const price = (orderItems || []).reduce((prev, cur) => prev + cur.price, 0);

    return (
        <Card className="bg-popover p-4 flex items-center justify-between mt-4">
            <div className="flex gap-2 items-center">
                <div className={`rounded-lg h-10 w-2 ${STATUS_COLOR[order.status]}`}/>
                <div>
                    <p className="text-xs text-primary opacity-90 leading-3">
                        #{order.id} from {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="normal-case">{order.status}</p>
                </div>
            </div>
            <div>
                <p className="text-xs text-primary opacity-90 leading-3">Order amount</p>
                <p>{priceFormat(price)}</p>
            </div>

            <div className="flex items-center">
                <div className="hidden md:flex justify-end min-w-[270px] gap-2">
                    {orderItems &&
                        [...orderItems].slice(0, 3).map(item => (
                            <div key={item.id}
                                 className="w-[48px] h-[48px] bg-white rounded-lg gap-2 border">
                                <Image
                                    className="object-cover object-top h-full w-auto rounded-lg m-auto"
                                    src={item.product.images[0]}
                                    alt="Product Image"
                                    width={64}
                                    height={64}
                                />
                            </div>
                        ))
                    }
                    {
                        orderItems && orderItems.length > 3 && (
                            <div className="w-[48px] h-[48px] p-2 bg-muted rounded-lg border text-center">
                                <h2 className="text-xl leading-4 mt-0.5">+{orderItems.length - 3}</h2>
                                <p className="text-primary text-[10px] opacity-90 leading-3">items</p>
                            </div>
                        )
                    }
                </div>

                <div
                    className="p-2 w-10 h-10 cursor-pointer text-primary opacity-90 ml-2"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    {isOpen ?
                        <ChevronUp className="animate-180-rotate" />:
                        <ChevronDown className="animate-180-rotate" />
                    }
                </div>
            </div>
        </Card>
    );
};