import type {FC} from 'react';
import {useState} from "react";
import {Card} from "@common/Card";
import {RadioGroup, RadioGroupItem} from "@common/RadioGroup";
import {Label} from "@ui/Label";
import {MagicCard} from "@containers/payment/MagicCard";
import {cn} from "@lib/utils";
import {useQuery} from "@tanstack/react-query";
import PaymentService from "@api/services/payment.service";
import {PaymentType} from "@/types/payment.interface";
import Link from "next/link";
import {useProfile} from "@hooks/useProfile";
import {Info} from "lucide-react";

export const OrderPaymentCard: FC = () => {
    const [method, setMethod] = useState<PaymentType>();
    const {profile} = useProfile();

    const {data: payments} = useQuery(["get payments"], () => {
        return PaymentService.getAll();
    }, {
        select: ({data}) => data,
    })

    return (
        <Card className="bg-popover p-4 mt-4">
            <h2 className="font-medium text-xl mb-2">Payment:</h2>

            <RadioGroup
                className="flex flex-col gap-2 ml-2 rounded-lg"
                onValueChange={(value: PaymentType) => setMethod(value)}
            >
                {payments?.map(payment => (
                    <div key={payment.id} className={cn("transition-all rounded-lg", {
                        "border p-2": method === payment.type
                    })}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={payment.type}/>
                            <Label className="text-lg font-normal">Magic card</Label>
                        </div>
                        {method === PaymentType.MAGIC && <MagicCard className="my-2 mx-auto" payment={payment}/>}
                    </div>
                ))}

                {(!payments?.length && profile) && (
                    <Link
                        className={cn(
                            "mt-2 bg-white shadow-sm border border hover:border-warning hover:underline",
                            "transition-all p-2 rounded-lg text-center hidden sm:flex gap-1 justify-center"
                        )}
                        href={`/users/${profile.id}`}
                    >
                        <p>You do not have any payment method, add it to your profile</p>
                        <Info className="w-4 h-4 text-primary opacity-90"/>
                    </Link>
                )}
            </RadioGroup>
        </Card>
    );
};