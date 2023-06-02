import type {FC} from 'react';
import type {User} from "@/types/user.interface";
import {Card} from "@common/Card";
import {Package} from "lucide-react";
import Link from "next/link";
import {StatisticBreadcrumb} from "@containers/user/layout/StatisticBreadcrumb";
import {Button} from "@ui/Button";

interface UserInfoCardProps {
    user: User;
}

export const UserInfoCard: FC<UserInfoCardProps> = ({user}) => {
    return (
        <Card className="h-fit p-4 gap-4 bg-popover">
            <div className="pb-2 border-b">
                <h2 className="font-bold text-xl">{user.name}</h2>
            </div>
            <section className="mt-2 sm:w-[280px]">
                <div className="flex justify-between">
                    <p className="font-medium">Registration:</p>
                    <p className="ml-50">{new Date().toLocaleDateString()}</p>
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