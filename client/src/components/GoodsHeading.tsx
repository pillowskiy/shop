import type {FC, HTMLAttributes, PropsWithChildren} from 'react';
import {cn} from "@lib/utils";
import {ChevronRight} from "lucide-react";
import {Badge} from "@ui/Badge";

interface GoodsHeadingProps extends HTMLAttributes<HTMLDivElement> {
    children: string;
    link?: string;
    badge?: string;
}

export const GoodsHeading: FC<GoodsHeadingProps> = ({link, children, badge, className, ...props}) => {
    return (
        <div
            className={cn("mb-2 mt-6 py-1 rounded-lg hover:bg-muted select-none",
                "transition-all w-fit hover:px-2 flex gap-1 cursor-pointer", className)}
            {...props}
        >
            <h1 className="text-xl">{children}</h1>
            <ChevronRight className="w-5 h-5 mt-1.5"/>
            {badge && <Badge className="h-4 px-2 py-2.5" variant="secondary">{badge}</Badge>}
        </div>
    );
};