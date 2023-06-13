import type {FC} from 'react';
import {Card} from "@common/Card";
import {Button} from "@ui/Button";
import {Anchor} from "@ui/Anchor";
import {useCart} from "@hooks/useCart";
import {priceFormat} from "@lib/formatter";
import {useMutation} from "@tanstack/react-query";
import OrderService from "@api/services/order.service";
import {useToast} from "@common/toast/useToast";
import {ToastAction} from "@common/toast/Toast";
import Link from "next/link";
import {isAxiosError} from "axios";
import {useAppDispatch} from "@redux/store";
import {clearCart} from "@redux/cart/cart.slice";
import {useRouter} from "next/router";

export const OrderConfirmationCard: FC = () => {
    const {totalItems, totalCost, items} = useCart();
    const {toast} = useToast();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {mutate} = useMutation(['create order'], () => {
        return OrderService.createOrder({
            items: items.map(({id, count}) => ({productId: id, quantity: count}))
        });
    }, {
        onSuccess: async () => {
            await router.push('/');
            toast({
                title: "✅ Order",
                description: "You have successfully placed an order",
                action: (
                    <Link href="/orders">
                        <ToastAction altText="Go to orders">Go to orders</ToastAction>
                    </Link>
                )
            });
            dispatch(clearCart())
        },
        onError: (err) => {
            if (isAxiosError(err) && !err.response?.data.errors) {
                toast({
                    variant: "destructive",
                    description: `❌ ${err.response?.data.message || "Unhandled error occurred!"}`
                });
            }
        }
    })

    return (
        <Card className="bg-popover p-4 px-6 sm:px-4 mt-4">
            <h2 className="font-medium text-xl">Total payable</h2>
            <hr className="my-2"/>
            <div className="flex justify-between text-xs">
                <p className="font-medium">{totalItems} products worth:</p>
                <p className="ml-50 text-primary opacity-90">{priceFormat(totalCost)}</p>
            </div>
            <div className="flex justify-between text-xs mt-2">
                <p className="font-medium">Delivery cost:</p>
                <p className="ml-50 text-primary opacity-90">at the carrier tariffs</p>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between items-center">
                <p className="font-medium">To be paid</p>
                <h2 className="text-2xl">{priceFormat(totalCost)}</h2>
            </div>
            <hr className="my-2"/>
            <footer>
                <Button className="w-full" onClick={mutate}>Confirm the order</Button>

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