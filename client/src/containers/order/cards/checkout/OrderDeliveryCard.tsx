import type {FC} from 'react';
import {Card} from "@common/Card";
import {RadioGroup, RadioGroupItem} from "@common/RadioGroup";
import {Label} from "@ui/Label";

export const OrderDeliveryCard: FC = () => {
    return (
        <Card className="bg-popover p-4 mt-4">
            <h2 className="font-medium text-xl mb-2">Delivery:</h2>

            <RadioGroup className="flex flex-col gap-2 ml-2 rounded-lg" defaultValue="courier">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="courier"/>
                    <Label className="text-lg font-normal">Courier to your address</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="office_a"/>
                    <Label className="text-lg font-normal">Pickup from the post office A</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="office_b"/>
                    <Label className="text-lg font-normal">Pickup from the post office B</Label>
                </div>
            </RadioGroup>
        </Card>
    );
};