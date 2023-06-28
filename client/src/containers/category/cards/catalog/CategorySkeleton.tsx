import type {FC} from 'react';
import {Card} from "@common/Card";
import {Skeleton} from "@ui/Skeleton";
import {cn} from "@lib/utils";

export const CategorySkeleton: FC = () => {
    return (
        <Card className={
            cn(
                "flex-1 shadow-md rounded-lg bg-popover flex h-[100px] cursor-pointer",
                "hover:scale-[1.01] hover:shadow-xl hover:bg-muted transition-all duration-200 border"
            )
        }>
            <Skeleton className="h-full w-3/12 rounded-l-lg"/>
            <Skeleton className="m-auto h-10 w-2/5" />
        </Card>
    );
};