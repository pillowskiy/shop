import type {FC} from 'react';

import {Card} from "@common/Card";
import {useQuery} from "@tanstack/react-query";
import ShippingService from "@api/services/shipping.service";
import {Select} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger} from "@common/Select";
import {useContext, useEffect} from "react";
import {OrderCheckoutContext, OrderShippingContext} from "@containers/order/CheckoutScreen";
import {getShippingName} from "@lib/csc";
import Link from "next/link";
import {Shipping} from "@types/shipping.interface";
import {CreateDeliveryForm} from "@containers/shipping/forms/CreateDeliveryForm";
import {INITIAL_SHIPPING_DATA} from "@containers/shipping/constant";

interface OrderDetailsCardProps {
    shipping: Shipping | null;
    setData: (newData: Shipping | null) => void;
}

export const OrderDetailsCard: FC<OrderDetailsCardProps> = () => {
    const {shippingId, updateDetails} = useContext(OrderCheckoutContext);
    const {errors, data, setData} = useContext(OrderShippingContext);

    const {data: shipping} = useQuery(['get shipping'], () => {
        return ShippingService.getAll()
    }, {
        select: ({data}) => data
    });

    useEffect(() => {
        if (!shipping) return;
        const method = shipping.find(method => JSON.stringify(method) === JSON.stringify(data));
        if (method) {
            setData(INITIAL_SHIPPING_DATA);
            updateDetails({shippingId: method.id});
        }
    }, [data]);
    const currentShipping = shipping?.find(method => method.id === shippingId);

    return (
        <Card className="bg-popover p-4 mt-4">
            <h2 className="font-medium text-xl">Customer info:</h2>

            <section className="overflow-y-hidden pt-0 p-2 -mt-2">
                <Select
                    value={shippingId > 0 ? shippingId.toString() : void 0}
                    onValueChange={(newValue) => {
                        updateDetails({ shippingId: +newValue })
                    }}
                >
                    <SelectTrigger className="bg-white mt-4" disabled={!shipping?.length}>
                        { currentShipping ? getShippingName(currentShipping) : "Select other details"}
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="-1">
                            Custom
                        </SelectItem>
                        {shipping?.map(method => (
                            <SelectItem key={method.id} value={method.id.toString()} disabled={!!method.temp}>
                                {getShippingName(method)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <CreateDeliveryForm data={currentShipping || data} setData={setData} errors={errors}/>

                {!shipping?.length &&
                    <Link
                        className="mt-4 bg-white shadow-sm border border-blue-300 p-2 rounded-lg text-center hidden sm:block"
                        href="/profile?tab=shipping"
                    >
                        Add delivery details to your profile to automate ordering
                    </Link>
                }
            </section>
        </Card>
    );
};