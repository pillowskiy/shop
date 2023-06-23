import type {FC} from 'react';
import {type Order, OrderStatus} from "@/types/order.interface";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import OrderService from "@api/services/order.service";
import {Button, ButtonProps} from "@ui/Button";
import {cn} from "@lib/utils";
import {buildToast, useToast} from "@common/toast/useToast";
import {isAxiosError} from "axios";

interface CancelOrderButtonProps extends ButtonProps {
    order: Order;
}

export const CancelOrderButton: FC<CancelOrderButtonProps> = ({order, className, disabled, ...props}) => {
    const {toast} = useToast();
    const queryClient = useQueryClient();

    const {mutate, isLoading} = useMutation(['delete order', order.id], () => {
        return OrderService.cancelOrder(order.id);
    }, {
        onSuccess: () => {
            toast(buildToast("order.cancellation.success").toast);
            return queryClient.invalidateQueries(['get orders']);
        },
        onError: (err) => {
            if (!isAxiosError(err)) return;
            toast(buildToast("error", {
                error: err.response?.data?.message || "Unhandled error occurred",
            }).toast);
        }
    })

    return (
        <Button
            className={cn("", className)}
            variant="destructive"
            disabled={disabled || order.status !== OrderStatus.PENDING || isLoading}
            onClick={() => mutate()}
            {...props}
        >
            Cancel
        </Button>
    );
};