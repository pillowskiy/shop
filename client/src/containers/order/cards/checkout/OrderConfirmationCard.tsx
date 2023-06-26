import type {FC, MouseEvent} from 'react';
import type {PromoCode} from "@/types/promo-code.interface";
import type {CreateShippingData} from "@/types/shipping.interface";
import {Card} from "@common/Card";
import {Button} from "@ui/Button";
import {Anchor} from "@ui/Anchor";
import {useCart} from "@hooks/useCart";
import {priceFormat} from "@lib/formatter";
import {useMutation} from "@tanstack/react-query";
import OrderService from "@api/services/order.service";
import {buildToast, useToast} from "@common/toast/useToast";
import {ToastAction} from "@common/toast/Toast";
import Link from "next/link";
import {isAxiosError} from "axios";
import {useAppDispatch} from "@redux/store";
import {clearCart} from "@redux/cart/cart.slice";
import {useRouter} from "next/router";
import {useContext} from "react";
import {OrderCheckoutContext, OrderShippingContext} from "@containers/order/CheckoutScreen";
import {InfoRow} from "@components/InfoRow";
import {makeDiscount} from "@lib/utils";
import ShippingService from "@api/services/shipping.service";
import {
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@common/AlertDialog";

interface OrderConfirmationCardProps {
    promo: PromoCode | null;
}

export const OrderConfirmationCard: FC<OrderConfirmationCardProps> = ({promo}) => {
    const {totalItems, totalCost} = useCart();
    const {items, shippingId, paymentId, updateDetails} = useContext(OrderCheckoutContext);
    const {data, setErrors} = useContext(OrderShippingContext);

    const {toast} = useToast();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {mutate: createOrder} = useMutation(['create order'], (customShippingId: number) => {
        return OrderService.createOrder({
            items,
            shippingId: customShippingId,
            paymentId,
            promoId: promo?.id
        });
    }, {
        onSuccess: async () => {
            await router.push('/');
            toast(buildToast("order.creation.success").setAction(
                <Link href="/orders">
                    <ToastAction altText="Go to orders">Go to orders</ToastAction>
                </Link>
            ));
            dispatch(clearCart())
        },
        onError: (err) => {
            if (isAxiosError(err) && !err.response?.data.errors) {
                toast(buildToast("error", {
                    error: err.response?.data.message || "Unhandled error occurred!"
                }).toast);
            }
        }
    });

    const {mutate: createShipping} = useMutation(['create shipping'], ({data}: { data: CreateShippingData }) => {
        return ShippingService.createShipping(data);
    }, {
        onMutate: () => {
            setErrors({});
        },
        onSuccess: ({data}) => {
            updateDetails({shippingId: data.id});
            createOrder(data.id);
        },
        onError: (err) => {
            if (!isAxiosError(err)) return;
            const errors = err.response?.data.errors;
            if (!errors) {
                toast(buildToast("error", {
                    error: err.response?.data.message || "Unhandled error occurred!"
                }).toast);
            } else {
                setErrors(errors);
            }
        }
    });

    const onConfirm = (event: MouseEvent<HTMLButtonElement>) => {
        if (shippingId > -1) {
            event.preventDefault();
            createOrder(shippingId);
        }
    }

    return (
        <Card className="bg-popover p-4 px-6 sm:px-4 mt-4">
            <h2 className="font-medium text-xl">Total payable</h2>
            <section className="py-2 my-2 border-y flex flex-col space-y-1.5">
                <InfoRow className="text-xs" title={`${totalItems} products worth`}>
                    {priceFormat(totalCost)}
                </InfoRow>
                <InfoRow className="text-xs" title="Delivery cost">
                    at the carrier tariffs
                </InfoRow>
                {!!promo && (
                    <InfoRow className="text-xs" title="Promo-Code">
                        {`-${promo.discountPercent}%`}
                    </InfoRow>
                )}
            </section>
            <div className="flex justify-between items-center">
                <p className="font-medium">To be paid</p>
                <h2 className="text-2xl">
                    {priceFormat(makeDiscount(totalCost, promo?.discountPercent || 0))}
                </h2>
            </div>
            <hr className="my-2"/>
            <footer>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="w-full" onClick={onConfirm}>
                            Confirm the order
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delivery method not created</AlertDialogTitle>
                            <AlertDialogDescription>
                                This shipping method was not found. Would you like to save it for future orders?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        {data && (
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogCancel onClick={() => createShipping({data: {...data, temp: true}})}>
                                    Leave it as a one-time use
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={() => createShipping({data: {...data}})}>
                                    Save
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        )}
                    </AlertDialogContent>
                </AlertDialog>

                <section className="mt-2 text-xs">
                    <p className="font-medium mb-1">
                        By confirming the order, I accept the {' '}
                        <Anchor className="opacity-90" href="#">Regulations on the personal
                            data</Anchor> {' '}
                        and {' '} <Anchor className="opacity-90" href="#">User agreements</Anchor></p>
                </section>
            </footer>
        </Card>
    );
};