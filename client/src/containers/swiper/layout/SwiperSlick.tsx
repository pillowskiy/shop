import React, {memo} from 'react';
import {cn} from "@lib/utils";
import {ITEMS} from "@containers/swiper/constants";

interface SwiperSlickProps {
    activeIndex: number
}

export const SwiperSlick = memo<SwiperSlickProps>(({activeIndex}) => {
    return (
        <footer className="mt-2 flex justify-center space-x-4">
            {Array.from({length: ITEMS.length}, (_, index) => (
                <span
                    key={index}
                    className={cn(
                        "w-2 h-2 rounded-full cursor-pointer md:hover:opacity-100",
                        "md:hover:ring-2 md:hover:ring-ring md:hover:ring-offset-2 transition-all",
                        "opacity-90 bg-input", {
                            "ring-2 ring-ring ring-offset-2 bg-muted-foreground": index === activeIndex,
                        }
                    )}
                />
            ))}
        </footer>
    )
});

SwiperSlick.displayName = "SwiperSlick";