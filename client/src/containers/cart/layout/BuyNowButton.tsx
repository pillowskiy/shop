import type {FC, PropsWithChildren} from 'react';
import type {CartItem} from "@/types/cart.interface";

import {addToCart} from "@redux/cart/cart.slice";
import {useAppDispatch} from "@redux/store";

import {Button, type ButtonProps} from "@ui/Button";
import {CartDialog} from "@containers/cart/dialogs/CartDialog";

import {cn} from "@lib/utils";

interface BuyNowButtonProps extends ButtonProps {
    items: CartItem[];
}

export const BuyNowButton: FC<PropsWithChildren<BuyNowButtonProps>> = ({items, className, children, ...props}) => {
    const dispatch = useAppDispatch();
    const addManyToCart = () => {
        items.forEach(item => dispatch(addToCart(item)));
    }

    return (
        <CartDialog>
            <Button
                className={cn("md:hover:underline", className)}
                onClick={() => addManyToCart()}
                {...props}
            >
                {children}
            </Button>
        </CartDialog>
    );
};