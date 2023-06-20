import type {FC} from 'react';
import type {CreateShippingData} from "@/types/shipping.interface";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@common/Card";
import {FormInput, FormInputProps} from "@components/FormInput";
import {Button} from "@ui/Button";
import React, {useContext, useState} from "react";
import {DeliveryAddressForm} from "@containers/shipping/forms/DeliveryAddressForm";
import {useMutation, useQuery} from "@tanstack/react-query";
import ShippingService from "@api/services/shipping.service";
import {buildToast, useToast} from "@common/toast/useToast";
import {isAxiosError} from "axios";
import {PhoneInput} from "@components/PhoneInput";
import {HoverInfoCard} from "@components/HoverInfoCard";
import {AccountContext} from "@containers/screens/UserWorkshopScreen";
import {DeliveryMethod} from "@containers/shipping/layout/DeliveryMethod";

const INITIAL_SHIPPING_DATA: Omit<CreateShippingData, 'temp'> = {
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
    const [errors, setErrors] = useState<Partial<Record<keyof CreateShippingData, string>>>({});

    const formInputProps = (value: keyof CreateShippingData): FormInputProps => {
        return {
            value: data[value]?.toString(),
            onChange: ({target}) => setData({...data, [value]: target.value}),
            error: errors[value],
        }
    }

    const {toast} = useToast();

    const {mutate} = useMutation(['create shipping'], () => {
        return ShippingService.createShipping(data);
    }, {
        onMutate: () => setErrors({}),
        onSuccess: () => {
            toast(buildToast("users.delivery.creation.success").toast);
            setData(INITIAL_SHIPPING_DATA);
        },
        onError: (err) => {
            if (!isAxiosError(err)) return;
            const errors = err.response?.data?.errors;
            if (errors) {
                setErrors(errors);
            } else {
                toast(buildToast("error", {
                    error: err.response?.data?.message || "Unhandled error occurred!"
                }).toast);
            }
        }
    });

    const {data: shipping} = useQuery(['get shipping'], () => {
        return ShippingService.getAll();
    }, {
        select: ({data}) => data,
    });

    return (
        <Card className="bg-popover animate-card-in px-1">
            <CardHeader>
                <CardTitle>Shipping</CardTitle>
                <CardDescription>
                    Give us your details to automate the delivery.
                </CardDescription>
            </CardHeader>
            <CardContent className="md:max-h-[600px] overflow-y-auto rounded-lg z-40">
                <section className="flex flex-col space-y-1.5">
                    <h2 className="font-medium">Delivery Methods:</h2>
                    {
                        shipping?.length ? shipping.map(method => (
                            <DeliveryMethod key={method.id} shipping={method} />
                        )) : (
                            <div className="text-center text-lg font-medium p-2 rounded-lg border bg-white">
                                🚩 There are no delivery methods yet.
                            </div>
                        )
                    }
                </section>

                <section className="flex gap-4">
                    <FormInput className="bg-white" label="Name" {...formInputProps("name")}/>
                    <FormInput className="bg-white" label="Surname" {...formInputProps("surname")}/>
                </section>
                <section>
                    <PhoneInput value={data.phone} onChange={(phone) => setData({...data, phone})}/>
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </section>

                <HoverInfoCard
                    title="Email Address"
                    description="Only the email address associated with the profile is allowed."
                >
                    <div>
                        <FormInput className="bg-white" label="Email" value={profile?.email} disabled/>
                    </div>
                </HoverInfoCard>

                <hr className="my-4"/>
                <DeliveryAddressForm data={data} updateData={(values) => setData({...data, ...values})}/>
            </CardContent>
            <CardFooter className="pt-2">
                <Button onClick={() => mutate()}>Create a delivery method</Button>
            </CardFooter>
        </Card>
    );
};