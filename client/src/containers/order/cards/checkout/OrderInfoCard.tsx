import React from 'react';
import {useCart} from "@hooks/useCart";
import {AlertCircle} from "lucide-react";
import {cn} from "@lib/utils";

import {opacityListAnimation} from "@lib/animations";
import {MCard} from "@common/Card";

export const OrderInfoCard = () => {
    const {items} = useCart();
    // TEMP
    const isWarning = items.some(item => item.product.id !== items[0].product.id);

    if (!isWarning) return null;

    return (
        <MCard
            className={cn(
                "bg-white hover:shadow-warning hover:shadow-sm",
                "transition-all cursor-pointer border-warning opacity-90 p-4 text-center",
                "mb-4 flex justify-between items-center"
            )}
            initial="initial"
            animate="animate"
            custom={1}
            variants={opacityListAnimation}
        >
            <AlertCircle className="hidden md:block text-warning"/>
            <p className="font-medium text-sm max-w-11/12">
                Please note: Products from different warehouses or different sellers will be delivered in separate
                orders
            </p>
            <AlertCircle className="hidden md:block text-warning"/>
        </MCard>
    );
};