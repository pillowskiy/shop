import {ReviewSort} from "@/types/review.interface";
import {memo, useState} from "react";
import {SortButton} from "@components/SortButton";
import {HoverInfoCard} from "@components/HoverInfoCard";

export const SortButtons = memo(() => {
    const [sortMethod, setSortMethod] = useState(ReviewSort.Newest);
    return (
        <section className="mt-2 mb-4 flex gap-2 bg-muted p-2 rounded-md overflow-x-auto">
            {
                Object.values(ReviewSort).map(value => (
                    <HoverInfoCard
                        key={value}
                        title="Review sorting"
                        description="You have already chosen to sort data by this key"
                        disabled={sortMethod !== value}
                    >
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
                    </HoverInfoCard>
                ))
            }
        </section>
    );
});

SortButtons.displayName = "SortButtons";