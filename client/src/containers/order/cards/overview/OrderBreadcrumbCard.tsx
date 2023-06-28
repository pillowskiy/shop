import type {FC} from 'react';
import {Button} from "@ui/Button";

import {Card} from "@common/Card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@common/Select";

import {orderDateFilter} from "@containers/order/constant";

interface OrderBreadcrumbCardProps {
    filter: keyof typeof orderDateFilter;
    setFilter: (value: keyof typeof orderDateFilter) => void
}

export const OrderBreadcrumbCard: FC<OrderBreadcrumbCardProps> = ({filter, setFilter}) => {
    const filters = Object.keys(orderDateFilter);

    return (
        <Card className="w-full mt-4 bg-popover p-4 flex gap-4 flex-col sm:flex-row justify-between animate-catalog-mount">
            <section className="px-2 py-1 bg-white border flex gap-4 rounded-lg overflow-x-auto">
                <Button className="h-8" disabled>All orders</Button>
                <Button className="h-8" variant="secondary" disabled>Warranty and returns</Button>
            </section>

            <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-[240px] bg-white">
                    <SelectValue placeholder="Select the period" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Select the period</SelectLabel>
                        <SelectItem value={filters[0]}>For all the time</SelectItem>
                        <SelectItem value={filters[1]}>Over the last month</SelectItem>
                        <SelectItem value={filters[2]}>Over the last six months</SelectItem>
                        <SelectItem value={filters[3]}>Over the last year</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Card>
    );
};