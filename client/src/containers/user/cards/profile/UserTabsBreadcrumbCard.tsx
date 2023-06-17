import type {FC} from 'react';
import {Card} from "@common/Card";
import {Button} from "@ui/Button";
import {HoverInfoCard} from "@components/HoverInfoCard";

export const UserTabsBreadcrumbCard: FC = () => {
    return (
        <HoverInfoCard
            title="Sorry for the inconvenience"
            description="This feature is currently under development"
        >
            <Card className="flex justify-start md:justify-center gap-2 px-4 py-1 mt-4 select-none bg-popover overflow-x-auto">
                <Button className="text-sm h-8" disabled>Comments</Button>
                <Button className="text-sm h-8 bg-muted" disabled>Disputes</Button>
                <Button className="text-sm h-8 bg-muted" disabled>Warnings</Button>
                <Button className="text-sm h-8 bg-muted" disabled>Bans</Button>
            </Card>
        </HoverInfoCard>
    );
};