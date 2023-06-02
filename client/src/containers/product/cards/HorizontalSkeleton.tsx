import type {FC} from 'react';
import {Skeleton} from "@ui/Skeleton";
import {Card} from "@common/Card";

export const HorizontalSkeleton: FC = () => {
    return (
        <Card className="flex w-full h-[96px] mt-4 p-4">
            <Skeleton className="min-w-[64px] min-h-[64px] rounded-lg"/>
            <section className="flex flex-col justify-center gap-2 w-9/12 h-full ml-4">
                <Skeleton className="w-1/5 h-5" />
                <Skeleton className="w-3/5 h-4" />
                <Skeleton className="w-2/5 h-4" />
            </section>

            <section className="ml-auto flex items-center gap-2">
                <Skeleton className="w-8 h-8" />
                <Skeleton className="w-8 h-8" />
            </section>
        </Card>
    );
};