import type {FC} from 'react';
import {Button, type ButtonProps} from "@ui/Button";
import {ShoppingCart} from "lucide-react";
import {Product} from "@/types/product.interface";
import {useCart} from "@hooks/useCart";
import {useAppDispatch} from "@redux/store";
import {addToCart} from "@redux/cart/cart.slice";
import {cn} from "@lib/utils";
import {CartDialog} from "@containers/cart/dialogs/CartDialog";

interface CartButtonProps extends ButtonProps {
    product: Product;
}

export const CartButton: FC<CartButtonProps> = ({className, product, ...props}) => {
    const {items} = useCart();
    const isExist = items.some(item => item.id === product.id);
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
                dispatch(addToCart(product))
            }}
            {...props}
        >
            <ShoppingCart/>
            <p className="ml-2">Add to cart</p>
        </Button>
    );
};