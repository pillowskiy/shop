import type {FC} from 'react';
import {Card} from "@common/Card";
import {RadioGroup, RadioGroupItem} from "@common/RadioGroup";
import {Label} from "@ui/Label";

export const OrderPaymentCard: FC = () => {
    return (
        <Card className="bg-popover p-4 mt-4">
            <h2 className="font-medium text-xl mb-2">Payment:</h2>

            <RadioGroup className="flex flex-col gap-2 ml-2 rounded-lg" defaultValue="magic">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="magic"/>
                    <Label className="text-lg font-normal">Magic card</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="office_a"/>
                    <Label className="text-lg font-normal">EasyPay</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="office_b"/>
                    <Label className="text-lg font-normal">Another one method</Label>
                </div>
            </RadioGroup>
        </Card>
    );
};