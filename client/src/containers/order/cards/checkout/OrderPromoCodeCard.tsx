import type {FC} from 'react';
import {Card} from "@common/Card";
import {FormInput} from "@components/FormInput";
import {Button} from "@ui/Button";

export const OrderPromoCodeCard: FC = () => {
    return (
        <Card className="bg-popover px-4 pb-4">
            <FormInput className="bg-white" label="Promo-code" placeholder="SUMMER2023"/>
            <Button className="mt-2 w-full">Apply</Button>
        </Card>
    );
};