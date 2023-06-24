import type {FC} from 'react';
import {PaymentType} from "@/types/payment.interface";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@common/Card";
import {Button} from "@ui/Button";
import React from "react";
import {Info, Plus} from "lucide-react";
import {cn} from "@lib/utils";
import {useQuery} from "@tanstack/react-query";
import PaymentService from "@api/services/payment.service";
import {PaymentMethod} from "@containers/payment/layout/PaymentMethod";
import {MagicCardCreation} from "@containers/payment/MagicCardCreation";
import {HoverInfoCard} from "@components/HoverInfoCard";

export const BillingTab: FC = () => {
    const {data: payments} = useQuery(['get payments'], () => {
        return PaymentService.getAll();
    }, {
        select: ({data}) => data,
    })

    return (
        <Card className="bg-popover animate-card-in px-1">
            <CardHeader>
                <CardTitle>Billing</CardTitle>
                <CardDescription>
                    Add a payment method to shop in two clicks.
                </CardDescription>
                <HoverInfoCard
                    title="Independent methods"
                    description="These are payment methods that are not tied to our store (google pay, apple pay, etc...)."
                >
                    <div className={cn(
                        "bg-white p-2 rounded-lg text-center border",
                        "border-warning shadow-sm flex justify-center"
                    )}>
                        <h2 className="font-medium text-sm md:hover:underline transition-all cursor-pointer">
                            You can always use other independent methods.
                        </h2>
                        <Info className="w-4 h-4 ml-1 text-primary opacity-90 cursor-pointer"/>
                    </div>
                </HoverInfoCard>
            </CardHeader>
            <CardContent className="md:max-h-[600px] overflow-y-auto rounded-lg">
                <section className="flex flex-col space-y-1.5">
                    <h2 className="font-medium">Payment Methods:</h2>
                    {
                        payments?.length ? payments.map(payment => (
                            <PaymentMethod
                                key={payment.id}
                                payment={payment}
                                badges={
                                    payment.type === "MAGIC" ?
                                        ["🔓 Default", "🔮 Magic", "💎 Unlimited"]:
                                        ["✏ Custom"]
                                }
                            />
                        )) : (
                            <div className="text-center text-lg font-medium p-2 rounded-lg border bg-white">
                                💳 There are no payment methods yet.
                            </div>
                        )
                    }
                </section>

                <section className="bg-white border rounded-lg p-4 flex flex-col justify-center items-center mt-4">
                    <div className="relative bg-muted p-2 rounded-lg w-[200px] h-[100px] md:w-[280px] md:h-[140px] cursor-pointer">
                        <Plus
                            className={cn(
                                "w-[64px] h-[64px] absolute top-[50%] -translate-y-[50%] left-[50%] text-primary",
                                "-translate-x-[50%] md:hover:rotate-[90deg] transition-all md:hover:scale-[1.20] opacuty-90"
                            )}
                        />
                    </div>
                    <Button className="mt-2 font-medium" variant="link">Add a new payment method</Button>
                </section>

                {
                    !payments?.some(payment => payment.type === PaymentType.MAGIC) &&
                    <MagicCardCreation />
                }
            </CardContent>
            <CardFooter className="pt-2">
                <Button>Create a payment method</Button>
            </CardFooter>
        </Card>
    );
};