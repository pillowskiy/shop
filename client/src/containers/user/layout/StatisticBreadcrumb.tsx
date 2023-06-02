import type {FC} from 'react';
import StaticService from '@api/services/statistic.service';
import {useQuery} from "@tanstack/react-query";

interface StatisticBreadcrumbProps {
    userId: number;
}

export const StatisticBreadcrumb: FC<StatisticBreadcrumbProps> = ({userId}) => {
    const {data: statistic} = useQuery(['get statistic'], () => {
        return StaticService.getUserStatistic(userId);
    }, {
        select: ({data}) => data
    });

    return (
        <section className="flex justify-center gap-6 overflow-x-auto mt-2 text-center">
            {statistic?.length ?
                statistic.map((stat, index) => (
                    <div key={index} className="w-fit">
                        <h2 className="text-xl font-medium text-primary">{stat.value}</h2>
                        <span className="opacity-80">{stat.name}</span>
                    </div>
                )): (
                    <div>🙅 There are not statistic yet.</div>
                )
            }
        </section>
    );
};