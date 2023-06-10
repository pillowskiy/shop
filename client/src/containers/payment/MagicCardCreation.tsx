import type {FC} from 'react';
import type {PaymentType} from "@/types/payment.interface";
import {cn} from "@lib/utils";
import {useMutation} from "@tanstack/react-query";
import PaymentService from "@api/services/payment.service";

export const MagicCardCreation: FC = () => {
    const {mutate} = useMutation(['create magic card'], () => {
        return PaymentService.createPayment({
            type: PaymentType.MAGIC,
            cardNumber:
        })
    })

    return (
        <div className="text-center p-2 rounded-lg p-2 border mt-4 bg-white">
            <div
                className={cn(
                    "rounded-md p-2 bg-popover font-medium cursor-pointer",
                    "border border-popover hover:border-purple-400 transition-all",
                    "drop-shadow-md hover:drop-shadow-purple-400 hover:text-purple-400"
                )}
            >
                ✨ Open magic card for free ✨
            </div>
        </div>
    );
};