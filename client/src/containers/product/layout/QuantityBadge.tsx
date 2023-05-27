import type {FC} from 'react';
import {Badge, BadgeProps} from "@ui/Badge";
import {cn} from "@lib/utils";

interface QuantityBadgeProps extends BadgeProps {
    quantity: number;
}

export const QuantityBadge: FC<QuantityBadgeProps> = ({quantity, className, ...props}) => {
    if (quantity) return null;
    return (
        <Badge
            className={cn("h-4 px-2 py-2.5 ml-1 hidden sm:inline-flex", className)}
            variant="secondary"
            {...props}
        >
            <p>Out of stock ❌</p>
        </Badge>
    );
};