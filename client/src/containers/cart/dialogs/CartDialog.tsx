import type {FC, PropsWithChildren} from 'react';
import {Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter} from "@common/Dialog";
import {useCart} from "@hooks/useCart";
import {MCartProductCard} from "@containers/cart/cards/CartProductCard";
import {EmptyItems} from "@containers/EmptyItems";
import {Button} from "@ui/Button";
import {DialogClose} from "@radix-ui/react-dialog";
import Link from "next/link";
import {opacityListAnimation} from "@lib/animations";

export const CartDialog: FC<PropsWithChildren> = ({children}) => {
    const {items, totalCost} = useCart();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className="w-screen h-screen md:h-fit md:h-4/5 md:w-[1080px] md:max-h-3/5 flex flex-col items-start"
            >
                <DialogTitle className="text-2xl">Cart ({items.length})</DialogTitle>
                <section className="w-full h-full overflow-y-auto">
                    {
                        items.length ? items.map((item, index) => (
                            <MCartProductCard
                                key={index}
                                initial="initial"
                                animate="animate"
                                custom={index}
                                variants={opacityListAnimation}
                                item={item}
                            />
                        )) : <EmptyItems>There are not products yet.</EmptyItems>
                    }
                </section>
                <DialogFooter className="w-full">
                    <DialogClose asChild>
                        <Button
                            className="mr-auto my-auto hidden md:block"
                            variant="secondary"
                        >
                            Continue shopping
                        </Button>
                    </DialogClose>
                    {
                        !!items.length && (
                            <div className="px-2 py-4 border bg-white rounded-lg flex gap-4 items-center">
                                <h2 className="font-medium text-xl">
                                    {totalCost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}$
                                </h2>
                                <DialogClose asChild>
                                    <Button asChild>
                                        <Link href="/checkout">Place an order</Link>
                                    </Button>
                                </DialogClose>
                            </div>
                        )
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};