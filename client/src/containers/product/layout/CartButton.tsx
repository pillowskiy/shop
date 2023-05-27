import type {FC} from 'react';
import {Button, type ButtonProps} from "@ui/Button";
import {ShoppingCart} from "lucide-react";
import {Product} from "@/types/product.interface";

interface CartButtonProps extends ButtonProps {
    product: Product;
}

export const CartButton: FC<CartButtonProps> = ({className, product, ...props}) => {
    return (
        <Button
            className={className}
            disabled={!product.quantity}
            {...props}
        >
            <ShoppingCart/>
            <p className="ml-2">Add to cart</p>
        </Button>
    );
};