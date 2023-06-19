import type {FC} from 'react';
import {Card} from "@common/Card";
import {MapPin, Info} from "lucide-react";
import Link from "next/link";
import {useProfile} from "@hooks/useProfile";
import {HoverInfoCard} from "@components/HoverInfoCard";

export const OrderContactsCard: FC = () => {
    const {profile} = useProfile();

    return (
        <Card className="bg-popover p-4 flex items-center hover:shadow-lg transition-all">
            <MapPin className="w-6 sm:w-8 h-6 sm:h-8 opacity-90 mr-1.5"/>
            <div>
                <p className="text-xs opacity-90">Automate form filling!</p>
                <HoverInfoCard
                    title="Location access"
                    description="Create a delivery method to fill out order forms in two clicks"
                >
                    <div className="flex hover:underline transition-all cursor-pointer">
                        <p className="text-sm sm:text-base font-medium">Give us access to your location</p>
                        <Info className="w-4 h-4 ml-1 hidden md:block text-muted-foreground" />
                    </div>
                </HoverInfoCard>
            </div>
            {profile && (
                <Link
                    href={`/profile?tab=shipping`}
                    className="ml-auto opacity-90 md:hover:underline transition-all text-xs sm:text-sm"
                >
                    Give access
                </Link>
            )}
        </Card>
    );
};