import {memo, useState} from "react";
import {ReviewSort} from "@/types/review.interface";
import {SortButton} from "@components/SortButton";
import {HoverInfoCard} from "@components/HoverInfoCard";

export const SortButtons = memo(() => {
    const [sortMethod, setSortMethod] = useState(ReviewSort.Newest);
    return (
        <section className="mt-2 mb-4 flex gap-2 bg-muted p-2 rounded-md overflow-x-auto">
            {
                Object.values<ReviewSort>(ReviewSort).map((value) => (
                    <HoverInfoCard
                        key={value}
                        title="Review sorting"
                        description="You have already chosen to sort data by this key"
                        disabled={sortMethod !== value}
                        openDelay={2000}
                    >
                        <div>
                            <SortButton
                                key={value}
                                className="capitalize"
                                value={value}
                                onValueChange={(newValue) => setSortMethod(newValue as ReviewSort)}
                                variant={sortMethod === value ? "default" : "secondary"}
                                disabled={sortMethod === value}
                            >
                                {value}
                            </SortButton>
                        </div>
                    </HoverInfoCard>
                ))
            }
        </section>
    );
});

SortButtons.displayName = "SortButtons";