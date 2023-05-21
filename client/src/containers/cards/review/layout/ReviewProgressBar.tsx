import type {FC} from 'react';
import {Progress} from "@ui/Progress";

interface ReviewProgressBarProps {
    starCount: number;
    intervalCounts: number;
    percentages: number;
}

export const ReviewProgressBar: FC<ReviewProgressBarProps> = ({starCount, percentages}) => {
    return (
        <div key={Math.random() * Date.now()} className="flex items-center gap-2 w-full mt-2">
            <p className="w-[80px]">{starCount} star</p>
            <Progress className="rounded-md border" value={percentages}/>
            <p className="w-[80px]">{percentages.toFixed(1)}%</p>
        </div>
    );
};