import type {FC} from 'react';
import {Card} from "@common/Card";
import {Button} from "@ui/Button";
import {Anchor} from "@ui/Anchor";
import {useCart} from "@hooks/useCart";

export const OrderConfirmationCard: FC = () => {
    const {totalItems, totalCost} = useCart();

    return (
        <Card className="bg-popover p-4 mt-4">
            <h2 className="font-medium text-xl">Total payable</h2>
            <hr className="my-2"/>
            <div className="flex justify-between text-xs">
                <p className="font-medium">{totalItems} products worth:</p>
                <p className="ml-50 text-primary opacity-90">{totalCost}$</p>
            </div>
            <div className="flex justify-between text-xs mt-2">
                <p className="font-medium">Delivery cost:</p>
                <p className="ml-50 text-primary opacity-90">at the carrier tariffs</p>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between items-center">
                <p className="font-medium">To be paid</p>
                <h2 className="text-2xl">{totalCost}$</h2>
            </div>
            <hr className="my-2"/>
            <footer>
                <Button className="w-full">Confirm the order</Button>

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