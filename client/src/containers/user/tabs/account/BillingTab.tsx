import type {FC} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@common/Card";
import {DialogClose} from "@radix-ui/react-dialog";
import {Button} from "@ui/Button";
import React from "react";
import {Info, Plus, CreditCard, Wand} from "lucide-react";
import {cn} from "@lib/utils";
import {Badge} from "@ui/Badge";

export const BillingTab: FC = () => {
    return (
        <Card className="bg-popover animate-card-in px-1">
            <CardHeader>
                <CardTitle>Billing</CardTitle>
                <CardDescription>
                    Add a payment method to shop in two clicks.
                </CardDescription>
                <div
                    className="bg-white p-2 rounded-lg text-center border border-warning shadow-sm flex justify-center">
                    <h2 className="font-medium text-sm md:hover:underline transition-all cursor-pointer">
                        You can always use other independent methods.
                    </h2>
                    <Info className="w-4 h-4 ml-1 text-primary opacity-90 cursor-pointer"/>
                </div>
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-y-auto rounded-lg">
                <section className="flex flex-col gap-2">
                    <h2 className="font-medium">Payment Methods:</h2>
                    <div className="p-2 rounded-lg bg-white shadow-sm flex flex-col gap-2 sm:flex-row">
                        <div>
                            <div className="flex gap-1 items-center">
                                <Wand className="h-5 sm:h-4 w-auto"/>
                                <p className="text-lg sm:text-base font-medium">Magic (*0000)</p>
                            </div>
                            <p className="text-sm sm:text-xs">Expires {new Date().toLocaleDateString()}</p>
                        </div>

                        <div className="flex flex-wrap gap-1 sm:max-w-[180px]">
                            <Badge className="h-4 uppercase pl-1.5" variant="secondary">🔓 Default</Badge>
                            <Badge className="h-4 uppercase pl-1.5" variant="secondary">🔮 Magic</Badge>
                            <Badge className="h-4 uppercase pl-1.5" variant="secondary">💎 Unlimited</Badge>
                        </div>
                        <Button className="w-full sm:w-auto ml-auto" variant="secondary">Edit</Button>
                    </div>

                    <div className="p-2 rounded-lg bg-white shadow-sm flex flex-col gap-2 sm:flex-row">
                        <div>
                            <div className="flex gap-1 items-center">
                                <CreditCard className="h-5 sm:h-4 w-auto"/>
                                <p className="text-lg sm:text-base font-medium">Visa (*0000)</p>
                            </div>
                            <p className="text-sm sm:text-xs">Expires {new Date().toLocaleDateString()}</p>
                        </div>

                        <div className="flex flex-wrap gap-1 sm:max-w-[180px]">
                            <Badge className="h-4 uppercase pl-1.5" variant="secondary">✏ Custom</Badge>
                        </div>
                        <Button className="w-full sm:w-auto ml-auto" variant="secondary">Edit</Button>
                    </div>
                </section>

                <section className="bg-white border rounded-lg p-4 flex flex-col justify-center items-center mt-4">
                    <div className="relative bg-muted p-2 rounded-lg w-[280px] h-[140px] cursor-pointer">
                        <Plus
                            className={cn(
                                "w-[64px] h-[64px] absolute top-[50%] -translate-y-[50%] left-[50%] text-primary",
                                "-translate-x-[50%] md:hover:rotate-[90deg] transition-all md:hover:scale-[1.20] opacuty-90"
                            )}
                        />
                    </div>
                    <Button className="mt-2 font-medium" variant="link">Add a new payment method</Button>
                </section>

                <div className="text-center p-2 rounded-lg p-2 border mt-4 bg-white">
                    <div
                        className={cn(
                            "rounded-md p-2 bg-popover font-medium cursor-pointer",
                            "border border-popover hover:border-purple-400 transition-all",
                            "drop-shadow-md hover:drop-shadow-purple-400 hover:text-purple-400"
                        )}
                    >
                        ✨ Open magic card for free ✨
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between">
                <DialogClose asChild>
                    <Button variant="secondary">Close</Button>
                </DialogClose>
                <Button>Save changes</Button>
            </CardFooter>
        </Card>
    );
};