import type {FC, HTMLAttributes} from 'react';
import {StarIcon} from "lucide-react";
import {cn} from "@lib/utils";

interface StarRatingProps extends HTMLAttributes<HTMLDivElement>{
    text?: string;
    rating: number;
}

export const StarRating: FC<StarRatingProps> = ({text, rating, className, ...props}) => {
    return (
        <div className={cn("flex gap-1 items-center", className)} {...props}>
            {Array.from({length: 5}, (_, index) => (
                <StarIcon
                    className={cn("w-4 h-4 text-warning", {
                        'fill-warning': index < rating
                    })}
                    key={index}
                />
            ))}

            <p className="ml-1 text-base font-medium">{text || `${rating.toFixed(1)} out of 5`}</p>
        </div>
    );
};