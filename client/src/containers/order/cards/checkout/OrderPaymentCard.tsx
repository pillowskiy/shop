import type {FC} from 'react';
import {Card} from "@common/Card";
import {RadioGroup, RadioGroupItem} from "@common/RadioGroup";
import {Label} from "@ui/Label";
import {MagicCard} from "@containers/payment/MagicCard";
import {cn} from "@lib/utils";
import {useState} from "react";

export const OrderPaymentCard: FC = () => {
    const [payment, setPayment] = useState("magic");

    return (
        <Card className="bg-popover p-4 mt-4">
            <h2 className="font-medium text-xl mb-2">Payment:</h2>

            <RadioGroup
                className="flex flex-col gap-2 ml-2 rounded-lg"
                defaultValue="magic"
                onValueChange={(value) => setPayment(value)}
            >
                <div className={cn("transition-all rounded-lg", {
                    "border p-2": payment === "magic"
                })}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="magic"/>
                        <Label className="text-lg font-normal">Magic card</Label>
                    </div>
                    {payment === "magic" && <MagicCard className="my-2 mx-auto"/>}
                </div>

                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="office_a"/>
                    <Label className="text-lg font-normal">EasyPay</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="office_b"/>
                    <Label className="text-lg font-normal">Another one method</Label>
                </div>

                <span className="mt-2 bg-white shadow-sm border border-warning p-2 rounded-lg text-center hidden sm:block">
                    Payment methods may vary depending on the delivery method
                </span>
            </RadioGroup>
        </Card>
    );
};