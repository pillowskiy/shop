import {forwardRef, useState} from 'react';
import type {Order} from "@/types/order.interface";
import {OrderStatus} from "@/types/order.interface";

import {ChevronDown, ChevronUp} from "lucide-react";
import {OrderDetailedInfo} from "@containers/order/layout/OrderDetailedInfo";
import Image from "next/image";

import {useQuery} from "@tanstack/react-query";
import OrderService from "@api/services/order.service";

import {priceFormat} from "@lib/formatter";
import {cn, makeDiscount} from "@lib/utils";

import {motion} from "framer-motion";

interface OrderOverviewCardProps {
    defaultOpen?: boolean;
    order: Order;
}

const STATUS_COLOR: Record<OrderStatus, string> = {
    [OrderStatus.COMPLETED]: "bg-green-400",
    [OrderStatus.CANCELLED]: "bg-red-400",
    [OrderStatus.PENDING]: "bg-blue-400"
}

const OrderOverviewCard = forwardRef<HTMLDivElement, OrderOverviewCardProps>(({order, defaultOpen}, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen || false);

    const {data: orderItems} = useQuery(['get order items', order.id], () => {
        return OrderService.getOrderItems(order.id);
    }, {
        select: ({data}) => data
    });

    if (!orderItems) return null;

    const price = (orderItems || []).reduce((prev, cur) => prev + cur.price, 0);

    return (
        <main ref={ref} className="bg-popover p-4 mt-4 rounded-lg border shadow-sm">
            <section
                className="flex items-center justify-between z-[10] cursor-pointer"
                onClick={() => setIsOpen(prev => !prev)}
            >
                <div className="flex gap-2 items-center">
                    <div className={`rounded-lg h-10 w-2 ${STATUS_COLOR[order.status]}`}/>
                    <div>
                        <p className="text-xs text-primary opacity-90 leading-3">
                            #{order.id} from {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="normal-case">{order.status}</p>
                    </div>
                </div>

                <div className={cn({"hidden": isOpen})}>
                    <p className="text-xs text-primary opacity-90 leading-3">Order amount</p>
                    <p>
                        {priceFormat(
                            makeDiscount(price, order.promoCode?.discountPercent || 0)
                        )}
                    </p>
                </div>

                <div className="flex items-center">
                    <div
                        className={cn(
                            "hidden md:flex justify-end min-w-[270px] gap-2 select-none", {
                                "hidden md:hidden": isOpen
                            }
                        )}
                    >
                        {orderItems && [...orderItems].slice(0, 3).map(item => (
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
                        ))}
                        {orderItems && orderItems.length > 3 && (
                            <div className="w-[48px] h-[48px] p-2 bg-muted rounded-lg border text-center">
                                <h2 className="text-xl leading-4 mt-0.5">+{orderItems.length - 3}</h2>
                                <p className="text-primary text-[10px] opacity-90 leading-3">items</p>
                            </div>
                        )}
                    </div>

                    <div className="p-2 w-10 h-10 text-primary opacity-90 ml-2">
                        {isOpen ?
                            <ChevronUp className="animate-180-rotate"/> :
                            <ChevronDown className="animate-180-rotate"/>
                        }
                    </div>
                </div>
            </section>

            {isOpen && <OrderDetailedInfo order={order} items={orderItems}/>}
        </main>
    );
});
OrderOverviewCard.displayName = "OrderOverviewCard";
const MOrderOverviewCard = motion<OrderOverviewCardProps>(OrderOverviewCard);
export {OrderOverviewCard, MOrderOverviewCard};