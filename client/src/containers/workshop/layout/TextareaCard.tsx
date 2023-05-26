import type {FC} from 'react';
import {Textarea} from "@ui/Textarea";
import {Card} from "@common/Card";

interface TextareaCardProps {
    description: string;
    setDescription: (description: string) => void;
}

export const TextareaCard: FC<TextareaCardProps> = ({description, setDescription}) => {
    return (
        <Card className="bg-popover shadow-md p-4">
            <Textarea
                className="w-full h-full bg-white resize-none"
                value={description}
                onChange={({target}) => setDescription(target.value)}
                placeholder="Product description"
            />
        </Card>
    );
};