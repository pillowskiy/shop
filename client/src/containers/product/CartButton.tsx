import type {FC} from 'react';
import {Button, type ButtonProps} from "@ui/Button";
import {ShoppingCart} from "lucide-react";

interface CartButtonProps extends ButtonProps {}

export const CartButton: FC<CartButtonProps> = ({className, ...props}) => {
    return (
        <Button className={className} {...props}>
            <ShoppingCart/>
            <p className="ml-2">Add to cart</p>
        </Button>
    );
};