import type {FC, PropsWithChildren} from 'react';
import {Dialog, DialogTrigger, DialogContent, DialogTitle} from "@common/Dialog";
import {useCart} from "@hooks/useCart";
import {CartProductCard} from "@containers/cart/cards/CartProductCard";
import {EmptyItems} from "@containers/EmptyItems";

export const CartDialog: FC<PropsWithChildren> = ({children}) => {
    const {items} = useCart();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-screen h-screen md:h-fit max-h-screen md:w-[1080px] md:max-h-3/5 overflow-y-auto flex flex-col items-start">
                <DialogTitle className="text-2xl">Cart</DialogTitle>
                {
                    items.length ? items.map((item, index) => (
                        <CartProductCard product={item} key={index}/>
                    )) : <EmptyItems>There are not products yet.</EmptyItems>
                }
            </DialogContent>
        </Dialog>
    );
};