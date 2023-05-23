import type {FC} from 'react';
import {Textarea} from "@ui/Textarea";
import {Card} from "@common/Card";

interface WorkshopTextareaProps {
    description: string;
    setDescription: (description: string) => void;
}

export const WorkshopTextarea: FC<WorkshopTextareaProps> = () => {
    return (
        <Card className="bg-popover shadow-md p-4">
            <Textarea
                className="w-full h-full bg-white resize-none"
                placeholder="Product description"
            />
        </Card>
    );
};