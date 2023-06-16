import type {FC} from 'react';
import type {Shipping} from "@/types/shipping.interface";

import {Card} from "@common/Card";
import {FormInput} from "@components/FormInput";
import {useQuery} from "@tanstack/react-query";
import ShippingService from "@api/services/shipping.service";
import {Select} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger} from "@common/Select";
import {getAddressPlaceholder} from "@lib/csc";
import {useContext} from "react";
import {OrderCheckoutContext} from "@containers/order/CheckoutScreen";
import {PhoneInput} from "@components/PhoneInput";

export const OrderDetailsCard: FC = () => {
    const {shippingId, updateDetails} = useContext(OrderCheckoutContext);

    const {data: shipping} = useQuery(['get shipping'], () => {
        return ShippingService.getAll()
    }, {
        select: ({data}) => data
    });
    const currentShipping = shipping?.find(method => method.id === shippingId);
    const getShippingName = (method: Shipping) => {
        return Object.values(getAddressPlaceholder(method)).join(" - ")
    }

    return (
        <Card className="bg-popover p-4 mt-4">
            <h2 className="font-medium text-xl">Customer info:</h2>

            <section className="overflow-y-hidden pt-0 p-2 -mt-2">
                <Select
                    value={shippingId > 0 ? shippingId.toString() : void 0}
                    onValueChange={(newValue) => updateDetails({ shippingId: +newValue })}
                >
                    <SelectTrigger className="bg-white mt-4" disabled={!shipping?.length}>
                        { currentShipping ? getShippingName(currentShipping) : "Select other details"}
                    </SelectTrigger>
                    <SelectContent>
                        {shipping?.map(item => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                                {getShippingName(item)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex gap-4">
                    <FormInput className="bg-white" label="Name" defaultValue={currentShipping?.name || ""}/>
                    <FormInput className="bg-white" label="Surname" defaultValue={currentShipping?.surname || ""}/>
                </div>
                <PhoneInput value={currentShipping?.phone || ""}/>

                {!shipping?.length &&
                    <span className="mt-4 bg-white shadow-sm border border-blue-300 p-2 rounded-lg text-center hidden sm:block">
                        Add delivery details to your profile to automate ordering
                    </span>
                }
            </section>
        </Card>
    );
};