import type {FC} from 'react';
import type {UpdateProductDataErrors} from "@/types/product.interface";
import {Textarea} from "@ui/Textarea";
import {Card} from "@common/Card";

interface TextareaCardProps {
    description: string;
    setDescription: (description: string) => void;
    errors: Pick<UpdateProductDataErrors, 'description'>
}

export const TextareaCard: FC<TextareaCardProps> = ({description, setDescription, errors}) => {
    return (
        <Card className="bg-popover shadow-md p-4">
            <Textarea
                className="w-full h-full bg-white resize-none"
                value={description}
                onChange={({target}) => setDescription(target.value)}
                placeholder="Product description"
            />
            {errors.description && <p className="text-destructive">{errors.description}</p>}
        </Card>
    );
};