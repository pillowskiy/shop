import React from 'react';
import {useCart} from "@hooks/useCart";
import {Card} from "@common/Card";
import {AlertCircle} from "lucide-react";
import {cn} from "@lib/utils";

export const OrderInfoCard = () => {
    const {items} = useCart();
    // TEMP
    const isWarning = items.some(item => item.id !== items[0].id);

    if (!isWarning) return null;

    return (
        <Card className={cn(
            "bg-white hover:shadow-warning hover:shadow-sm",
            "transition-all cursor-pointer border-warning opacity-90 p-4 text-center",
            "mb-4 flex justify-between items-center"
        )}>
            <AlertCircle className="hidden md:block text-warning" />
            <p className="font-medium text-sm max-w-11/12">
                Please note: Products from different warehouses or different sellers will be delivered in separate orders
            </p>
            <AlertCircle className="hidden md:block text-warning" />
        </Card>
    );
};