import type {FC} from 'react';
import {Card} from "@common/Card";
import {Button} from "@ui/Button";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@common/Select"

export const OrderBreadcrumbCard: FC = () => {
    return (
        <Card className="w-full mt-4 bg-popover p-4 flex gap-4 justify-between overflow-x-auto">
            <section className="px-2 py-1 bg-white border flex gap-4 max-w-8/12 rounded-lg">
                <Button className="h-8" disabled>All orders</Button>
                <Button className="h-8" variant="secondary" disabled>Warranty and returns</Button>
            </section>

            <Select>
                <SelectTrigger className="max-w-4/12 w-[240px] bg-white">
                    <SelectValue placeholder="Select the period" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Select the period</SelectLabel>
                        <SelectItem value="all">For all the time</SelectItem>
                        <SelectItem value="month">Over the last month</SelectItem>
                        <SelectItem value="six_month">Over the last six months</SelectItem>
                        <SelectItem value="year">Over the last year</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Card>
    );
};