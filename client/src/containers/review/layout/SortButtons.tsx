import {ReviewSort} from "@/types/review.interface";
import {memo, useState} from "react";
import {SortButton} from "@components/SortButton";

export const SortButtons = memo(() => {
    const [sortMethod, setSortMethod] = useState(ReviewSort.Newest);
    return (
        <section className="mt-2 mb-4 flex gap-2 bg-muted p-2 rounded-md overflow-x-auto">
            {
                Object.values(ReviewSort).map(value => (
                    <SortButton
                        key={value}
                        className="capitalize"
                        value={value}
                        onValueChange={(newValue) => setSortMethod(newValue)}
                        variant={sortMethod === value ? "default" : "secondary"}
                        disabled={sortMethod === value}
                    >
                        {value}
                    </SortButton>
                ))
            }
        </section>
    );
});

SortButtons.displayName = "SortButtons";