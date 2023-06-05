import type {FC} from 'react';
import {Card} from "@common/Card";
import {ChevronRight, MapPin} from "lucide-react";

export const OrderContactsCard: FC = () => {
    return (
        <Card
            className="bg-popover p-4 flex items-center hover:bg-muted hover:shadow-lg transition-all cursor-pointer">
            <MapPin className="w-8 h-8 opacity-90 mr-2"/>
            <div>
                <p className="text-xs opacity-90">Your city:</p>
                <p className="font-medium">Bunbulandia</p>
            </div>
            <ChevronRight className="ml-auto w-6 h-6 opacity-90"/>
        </Card>
    );
};