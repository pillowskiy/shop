import type {FC} from 'react';
import type {User} from "@/types/user.interface";
import {Gender} from "@/types/user.interface";
import {Card} from "@common/Card";
import {Package} from "lucide-react";
import Link from "next/link";
import {StatisticBreadcrumb} from "@containers/user/layout/StatisticBreadcrumb";

interface UserInfoCardProps {
    user: User;
}

export const UserInfoCard: FC<UserInfoCardProps> = ({user}) => {
    return (
        <Card className="h-fit p-4 gap-4 bg-popover mt-4 sm:mt-0">
            <div className="pb-2 border-b">
                <h2 className="font-bold text-xl">{user.name}</h2>
                <span>{user.aboutMe}</span>
            </div>
            <section className="mt-2 sm:w-[280px]">
                <div className="flex justify-between">
                    <p className="font-medium">Registration:</p>
                    <p className="ml-50">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-medium">Gender:</p>
                    <p className="ml-50">{user.gender === Gender.Unknown ? "not specified" : user.gender}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-medium">Date of birth:</p>
                    <p className="ml-50">{new Date(user.birthDate).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-medium">Age:</p>
                    <p className="ml-50">{new Date().getFullYear() - new Date(user.birthDate).getFullYear()}</p>
                </div>
            </section>
            <section className="py-2 border-y mt-2">
                <Link
                    href={`/products/users/${user.id}`}
                    className="flex items-center md:hover:underline transition-all"
                >
                    <Package className="w-4 h-4 mr-2"/>
                    <span>{`${user.name}'s products`}</span>
                </Link>
            </section>

            <StatisticBreadcrumb userId={user.id} />
        </Card>
    );
};