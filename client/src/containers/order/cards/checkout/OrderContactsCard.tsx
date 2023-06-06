import type {FC} from 'react';
import {Card} from "@common/Card";
import {MapPin} from "lucide-react";
import {Button} from "@ui/Button";

export const OrderContactsCard: FC = () => {
    return (
        <Card
            className="bg-popover p-4 flex items-center hover:bg-muted hover:shadow-lg transition-all cursor-pointer">
            <MapPin className="w-8 h-8 opacity-90 mr-2"/>
            <div>
                <p className="text-xs opacity-90">Your city:</p>
                <p className="font-medium">Bunbulandia</p>
            </div>
            <Button className="ml-auto opacity-90" variant="link">Is not?</Button>
        </Card>
    );
};