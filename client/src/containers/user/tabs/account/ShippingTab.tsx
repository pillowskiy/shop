import type {FC} from 'react';
import type {CreateShippingData} from "@/types/shipping.interface";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@common/Card";
import {FormInput, FormInputProps} from "@components/FormInput";
import {DialogClose} from "@radix-ui/react-dialog";
import {Button} from "@ui/Button";
import {useContext, useState} from "react";
import {AccountContext} from "@containers/user/tabs/account/AccountTab";
import {DeliveryAddressForm} from "@containers/shipping/forms/DeliveryAddressForm";
import {useMutation} from "@tanstack/react-query";
import ShippingService from "@api/services/shipping.service";
import {useToast} from "@common/toast/useToast";
import {isAxiosError} from "axios";
import {PhoneInput} from "@components/PhoneInput";
import {HoverInfoCard} from "@components/HoverInfoCard";

const INITIAL_SHIPPING_DATA: CreateShippingData = {
    country: "",
    state: "",
    city: "",
    surname: "",
    name: "",
    phone: "",
}

export const ShippingTab: FC = () => {
    const profile = useContext(AccountContext);
    const [data, setData] = useState<CreateShippingData>(INITIAL_SHIPPING_DATA);
    const [errors, setErrors] = useState<Record<keyof CreateShippingData, string>>(INITIAL_SHIPPING_DATA);

    const formInputProps = (value: keyof CreateShippingData): FormInputProps => {
        return {
            value: data[value],
            onChange: ({target}) => setData({...data, [value]: target.value}),
            error: errors[value],
        }
    }

    const {toast} = useToast();

    const {mutate} = useMutation(['create shipping'], () => {
        return ShippingService.createShipping(data);
    }, {
        onMutate: () => setErrors(INITIAL_SHIPPING_DATA),
        onSuccess: () => {
            toast({
                description: "✅ You have successfully added a new delivery address"
            });
            setData(INITIAL_SHIPPING_DATA);
        },
        onError: (err) => {
            if (!isAxiosError(err)) return;
            const errors = err.response?.data?.errors;
            if (errors) {
                setErrors(errors);
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh, Oh! Something went wrong.",
                    description: err.response?.data?.message || "Unhandled error occurred!",
                });
            }
        }
    });

    return (
        <Card className="bg-popover animate-card-in">
            <CardHeader>
                <CardTitle>Shipping</CardTitle>
                <CardDescription>
                    Give us your details to automate the delivery.
                </CardDescription>
                <CardContent className="p-1 max-h-[600px] overflow-y-auto rounded-lg z-40">
                    <section className="flex gap-4">
                        <FormInput className="bg-white" label="Name" {...formInputProps("name")}/>
                        <FormInput className="bg-white" label="Surname" {...formInputProps("surname")}/>
                    </section>
                    <div>
                        <PhoneInput value={data.phone} onChange={(phone) => setData({...data, phone})}/>
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>

                    <HoverInfoCard
                        title="Email Address"
                        description="Only the email address associated with the profile is allowed."
                    >
                        <FormInput className="bg-white" label="Email" value={profile?.email} disabled/>
                    </HoverInfoCard>

                    <hr className="my-4"/>
                    <DeliveryAddressForm data={data} updateData={(values) => setData({...data, ...values})}/>
                </CardContent>
                <CardFooter className="px-0 pt-2 flex justify-between">
                    <DialogClose asChild>
                        <Button variant="secondary">Close</Button>
                    </DialogClose>
                    <Button onClick={mutate}>Save changes</Button>
                </CardFooter>
            </CardHeader>
        </Card>
    );
};