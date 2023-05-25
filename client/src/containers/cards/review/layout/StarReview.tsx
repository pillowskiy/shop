import type {FC, HTMLAttributes} from 'react';
import {Star} from "lucide-react";
import {cn} from "@lib/utils";

interface StarReviewProps extends HTMLAttributes<HTMLDivElement> {
    isFill: boolean;
    text: string;
}

export const StarReview: FC<StarReviewProps> = ({isFill, text, ...props}) => {
    return (
        <div {...props}>
            <Star
                className={cn("text-warning w-5 h-5 m-auto transition-all md:hover:fill-warning", {
                    'fill-warning': isFill
                })}
            />
            <p className="text-xs text-primary opacity-90">{text}</p>
        </div>
    );
};