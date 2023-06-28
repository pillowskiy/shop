import {type FC, useContext} from 'react';

import {Textarea} from "@ui/Textarea";
import {Card} from "@common/Card";
import {WorkShopContext} from "@containers/product/containers/workshop";

interface TextareaCardProps {
    setDescription: (description: string) => void;
}

export const TextareaCard: FC<TextareaCardProps> = ({setDescription}) => {
    const {newProduct, errors} = useContext(WorkShopContext);

    return (
        <Card className="bg-popover shadow-md p-4">
            <Textarea
                className="w-full h-full bg-white resize-none"
                value={newProduct.description}
                onChange={({target}) => setDescription(target.value)}
                placeholder="Product description"
            />
            {errors.description && <p className="text-destructive">{errors.description}</p>}
        </Card>
    );
};