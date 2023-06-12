import type {FC} from 'react';
import {Card} from "@common/Card";
import {FormInput} from "@components/FormInput";
import {useQuery} from "@tanstack/react-query";
import ShippingService from "@api/services/shipping.service";
import {Select} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger} from "@common/Select";
import {getAddressPlaceholder} from "@lib/csc";

export const OrderDetailsCard: FC = () => {
    const {data: shipping} = useQuery(['get shipping'], () => {
        return ShippingService.getAll()
    }, {
        select: ({data}) => data
    });

    return (
        <Card className="bg-popover p-4 mt-4">
            <h2 className="font-medium text-xl">Customer info:</h2>

            <section className="overflow-y-hidden pt-0 p-2 -mt-2">
                <div className="flex gap-4">
                    <FormInput className="bg-white" label="Name"/>
                    <FormInput className="bg-white" label="Surname"/>
                </div>
                <FormInput className="bg-white" label="Phone number"/>

                <Select>
                    <SelectTrigger className="bg-white mt-4" disabled={shipping?.length < 1}>
                        Select other details
                    </SelectTrigger>
                    <SelectContent>
                        {shipping?.map(item => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                                {Object.values(getAddressPlaceholder(item)).join(" - ")}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {!shipping?.length &&
                    <span className="mt-4 bg-white shadow-sm border border-blue-300 p-2 rounded-lg text-center hidden sm:block">
                        Add delivery details to your profile to automate ordering
                    </span>
                }
            </section>
        </Card>
    );
};