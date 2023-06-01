import type {FC} from 'react';
import {Button, type ButtonProps} from "@ui/Button";
import {ShoppingCart} from "lucide-react";
import {Product} from "@/types/product.interface";
import {useCart} from "@hooks/useCart";
import {useAppDispatch} from "@redux/store";
import {addToCart} from "@redux/cart/cart.slice";
import {cn} from "@lib/utils";
import {CartDialog} from "@containers/cart/dialogs/CartDialog";
import {useToast} from "@common/toast/useToast";
import {ToastAction} from "@common/toast/Toast";

interface CartButtonProps extends ButtonProps {
    product: Product;
}

export const CartButton: FC<CartButtonProps> = ({className, product, ...props}) => {
    const {items} = useCart();
    const isExist = items.some(item => item.id === product.id);
    const dispatch = useAppDispatch();
    const {toast} = useToast();

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
                toast({
                    description: "✅ You have successfully added a product to your basket",
                    action: (
                        <CartDialog>
                            <ToastAction altText="Go to cart">Go to cart</ToastAction>
                        </CartDialog>
                    ),
                })
            }}
            {...props}
        >
            <ShoppingCart/>
            <p className="ml-2">Add to cart</p>
        </Button>
    );
};