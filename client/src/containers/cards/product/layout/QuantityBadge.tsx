import type {FC} from 'react';
import {Badge} from "@ui/Badge";

interface QuantityBadgeProps {
    quantity: number;
}

export const QuantityBadge: FC<QuantityBadgeProps> = ({quantity}) => {
    if (quantity) return null;
    return (
        <Badge
            className="h-4 px-2 py-2.5 absolute ml-1 hidden sm:inline-flex"
            variant="secondary"
        >
            <p>Out of stock ❌</p>
        </Badge>
    );
};