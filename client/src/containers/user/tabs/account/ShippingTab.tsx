import type {FC} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@common/Card";
import {FormInput} from "@components/FormInput";
import {DialogClose} from "@radix-ui/react-dialog";
import {Button} from "@ui/Button";
import { UA, DE, FR, PL, GB } from 'country-flag-icons/react/1x1'
import {useContext} from "react";
import {AccountContext} from "@containers/user/tabs/account/AccountTab";
import {DeliveryAddressForm} from "@containers/shipping/forms/DeliveryAddressForm";

export const ShippingTab: FC = () => {
    const profile = useContext(AccountContext);

    return (
        <Card className="bg-popover animate-card-in">
            <CardHeader>
                <CardTitle>Shipping</CardTitle>
                <CardDescription>
                    Give us your details to automate the delivery.
                </CardDescription>
                <CardContent className="p-1 max-h-[600px] overflow-y-auto rounded-lg z-40">
                    <section className="flex gap-4">
                        <FormInput className="bg-white" label="Name"/>
                        <FormInput className="bg-white" label="Surname"/>
                    </section>
                    <FormInput className="bg-white" label="Phone number"/>
                    <FormInput className="bg-white" label="Email" defaultValue={profile?.email}/>

                    <hr className="my-4" />
                    <DeliveryAddressForm />
                </CardContent>
                <CardFooter className="px-0 pt-2 flex justify-between">
                    <DialogClose asChild>
                        <Button variant="secondary">Close</Button>
                    </DialogClose>
                    <Button>Save changes</Button>
                </CardFooter>
            </CardHeader>
        </Card>
    );
};