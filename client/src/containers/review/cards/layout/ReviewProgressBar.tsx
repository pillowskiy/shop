import type {FC} from 'react';
import {Progress} from "@ui/Progress";

interface ReviewProgressBarProps {
    starCount: number;
    intervalCounts: number;
    percentages: number;
}

export const ReviewProgressBar: FC<ReviewProgressBarProps> = ({starCount, percentages}) => {
    return (
        <div key={Math.random() * Date.now()} className="flex items-center gap-2 w-full mb-2 text-left">
            <p className="w-[64px]">{starCount} star</p>
            <Progress className="rounded-md border" value={percentages}/>
            <p className="w-[64px]">{percentages.toFixed(1)}%</p>
        </div>
    );
};