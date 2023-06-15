import {Button} from "@ui/Button";
import {memo} from "react";

export const SortButtons = memo(() => {
    return (
        <section className="mt-2 mb-4 flex gap-2 bg-muted p-2 rounded-md overflow-x-auto">
            <Button className="h-8" variant="default" disabled>Newest</Button>
            <Button className="h-8" variant="secondary">Oldest</Button>
            <Button className="h-8" variant="secondary">Better</Button>
            <Button className="h-8" variant="secondary">Worse</Button>
        </section>
    );
});

SortButtons.displayName = "SortButtons";