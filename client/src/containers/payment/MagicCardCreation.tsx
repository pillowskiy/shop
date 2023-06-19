import type {FC} from 'react';
import {cn} from "@lib/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import PaymentService from "@api/services/payment.service";
import {buildToast, useToast} from "@common/toast/useToast";
import {isAxiosError} from "axios";

export const MagicCardCreation: FC = () => {
    const {toast} = useToast();
    const queryClient = useQueryClient();

    const {mutate} = useMutation(['create magic'], () => {
        return PaymentService.createMagicCard();
    }, {
        onError: (err) => {
            if (!isAxiosError(err)) return;
            toast(buildToast("error", {
                error: err.response?.data?.message || "Unhandled error occurred!"
            }).toast);
        },
        onSuccess: () => {
            toast(buildToast("magic.creation.success").toast);
            return queryClient.invalidateQueries(['get payments'])
        }
    })

    return (
        <div className="text-center p-2 rounded-lg p-2 border mt-4 bg-white">
            <div
                className={cn(
                    "rounded-md p-2 bg-popover font-medium cursor-pointer",
                    "border border-popover hover:border-purple-400 transition-all",
                    "drop-shadow-md hover:drop-shadow-purple-400 hover:text-purple-400"
                )}
                onClick={() => mutate()}
            >
                ✨ Open magic card for free ✨
            </div>
        </div>
    );
};