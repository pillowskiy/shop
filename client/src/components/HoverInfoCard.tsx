import type {FC, PropsWithChildren} from 'react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@common/HoverCard"

interface HoverInfoCardProps {
    title?: string;
    description: "string";
}

export const HoverInfoCard: FC<PropsWithChildren<HoverInfoCardProps>> = ({description, title, children}) => {
    return (
        <HoverCard openDelay={100} closeDelay={300}>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <h4 className="text-sm font-semibold">{title}</h4>
                <span className="text-sm text-muted-foreground">
                    {description}
                </span>
            </HoverCardContent>
        </HoverCard>
    );
};