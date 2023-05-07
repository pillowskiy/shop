import type {FC} from 'react';
import {Button} from "@ui/Button";

export const CatalogButton: FC = () => {

    return (
        <Button variant="outline" className="bg-muted hover:bg-muted-foreground">
            Catalog
        </Button>
    );
};