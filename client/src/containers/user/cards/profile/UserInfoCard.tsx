import type {FC} from 'react';
import type {User} from "@/types/user.interface";
import {Gender} from "@/types/user.interface";

import {Package} from "lucide-react";
import {StatisticBreadcrumb} from "@containers/user/layout/StatisticBreadcrumb";
import {InfoRow} from "@components/InfoRow";

import {Routes} from "@config";
import Link from "next/link";

import {MCard} from "@common/Card";
import {opacityListAnimation} from "@lib/animations";

interface UserInfoCardProps {
    user: User;
}

export const UserInfoCard: FC<UserInfoCardProps> = ({user}) => {
    return (
        <MCard
            className="h-fit p-4 gap-4 bg-popover mt-4 sm:mt-0"
            initial="initial"
            animate="animate"
            custom={1}
            variants={opacityListAnimation}
        >
            <div className="pb-2 border-b">
                <h2 className="font-bold text-xl">{user.name}</h2>
                <span>{user.aboutMe}</span>
            </div>
            <section className="mt-2 sm:w-[280px]">
                <InfoRow title="Registration">
                    {new Date(user.createdAt).toLocaleDateString()}
                </InfoRow>
                <InfoRow title="Gender">
                    {user.gender === Gender.Unknown ? "not specified" : user.gender}
                </InfoRow>
                <InfoRow title="Date of birth">
                    {new Date(user.birthDate).toLocaleDateString()}
                </InfoRow>
                <InfoRow title="Age">
                    {new Date().getFullYear() - new Date(user.birthDate).getFullYear()}
                </InfoRow>
            </section>
            <section className="py-2 border-y mt-2">
                <Link
                    href={`${Routes.UserProducts}/${user.id}`}
                    className="flex items-center md:hover:underline transition-all"
                >
                    <Package className="w-4 h-4 mr-2"/>
                    <span>{`${user.name}'s products`}</span>
                </Link>
            </section>

            <StatisticBreadcrumb userId={user.id} />
        </MCard>
    );
};