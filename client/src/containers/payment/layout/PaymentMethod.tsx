import type {FC} from 'react';
import React from "react";
import type {Payment} from "@/types/payment.interface";
import {PaymentType} from "@/types/payment.interface";
import {CreditCard, Wand} from "lucide-react";
import {Badge} from "@ui/Badge";
import {Button} from "@ui/Button";

interface PaymentMethodProps {
    payment: Payment;
    badges: string[];
}

export const PaymentMethod: FC<PaymentMethodProps> = ({payment, badges = []}) => {
    return (
        <div className="p-2 rounded-lg bg-white shadow-sm flex flex-col gap-2 sm:flex-row border">
            <div>
                <div className="flex gap-1 items-center">
                    {payment.type === PaymentType.MAGIC ?
                        <Wand className="h-5 sm:h-4 w-auto"/>:
                        <CreditCard className="h-5 sm:h-4 w-auto"/>
                    }
                    <p className="text-lg sm:text-base font-medium">Magic (*{payment.cardNumber.slice(16 - 4)})</p>
                </div>
                <p className="text-sm sm:text-xs">Expires {new Date(payment.cardExpiresAt).toLocaleDateString()}</p>
            </div>

            <div className="flex flex-wrap gap-1 sm:max-w-[180px]">
                {badges.map((badge, index) => (
                    <Badge
                        key={index}
                        className="h-4 uppercase pl-1.5"
                        variant="secondary"
                    >
                        {badge}
                    </Badge>
                ))}
            </div>
            <Button className="w-full sm:w-auto ml-auto" variant="secondary">Edit</Button>
        </div>
    );
};