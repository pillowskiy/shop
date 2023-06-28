import type {FC} from 'react';
import type {Product} from "@/types/product.interface";
import {Button, type ButtonProps} from "@ui/Button";
import {ShoppingCart} from "lucide-react";

import {useCart} from "@hooks/useCart";
import {useAppDispatch} from "@redux/store";
import {addToCart} from "@redux/cart/cart.slice";

import {CartDialog} from "@containers/cart/dialogs/CartDialog";

import {cn} from "@lib/utils";

interface CartButtonProps extends ButtonProps {
    product: Product;
}

export const CartButton: FC<CartButtonProps> = ({className, product, ...props}) => {
    const {items} = useCart();
    const isExist = items.some(item => item.productId === product.id);
    const dispatch = useAppDispatch();

    if (isExist) {
        return (
            <CartDialog>
                <Button
                    className={cn("md:hover:underline", className)}
                    variant="link"
                    {...props}
                >
                    <ShoppingCart/>
                    <p className="ml-2">In the cart</p>
                </Button>
            </CartDialog>
        )
    }

    return (
        <Button
            className={className}
            disabled={!product.quantity}
            onClick={() => {
                dispatch(addToCart({ productId: product.id, count: 1 }));
            }}
            {...props}
        >
            <ShoppingCart/>
            <p className="ml-2">Add to cart</p>
        </Button>
    );
};