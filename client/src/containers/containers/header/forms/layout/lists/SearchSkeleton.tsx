import type {FC} from 'react';
import {List} from "../";
import {Skeleton} from "@ui/Skeleton";

export const SearchSkeleton: FC = () => {
    return (
        <List.Search>
            <Skeleton className="w-[180px] h-4 mb-2"/>
            {Array.from({length: 3}, () => (
                <div key={Date.now() * Math.random()} className="rounded-sm flex mb-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className={`ml-2 h-5 w-[100%]`} />
                </div>
            ))}
            <Skeleton className="w-[240px] h-4 mb-2"/>
            {Array.from({length: 3}, () => (
                <div key={Date.now() * Math.random()} className="rounded-sm flex mb-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className={`ml-2 h-5 w-[100%]`} />
                </div>
            ))}
        </List.Search>
    );
};