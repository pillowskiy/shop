import type {FC} from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import {Swiper as LibSwiper, SwiperRef, SwiperSlide} from "swiper/react";
import {Pagination, Navigation, Autoplay} from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useCallback, useRef, useState} from "react";
import Image from "next/image";

/**
 * Carousel element for interesting offers with "swiper" library.
 *
 * @deprecated Deprecated!
 */
export const OfferCarousel: FC = () => {
    const [queue, setQueue] = useState([
        {
            key: 1,
            color: 'bg-red-500'
        },
        {
            key: 2,
            color: 'bg-pink-500'
        },
        {
            key: 3,
            color: 'bg-blue-500'
        },
        {
            key: 4,
            color: 'bg-yellow-500'
        },
        {
            key: 5,
            color: 'bg-purple-500'
        },
    ]);

    const swiperRef = useRef<SwiperRef>(null);

    const handlePrev = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slideNext();
    }, []);

    return (
        <section className="relative mt-4">
            <ChevronLeft className="absolute w-8 h-8 top-10 z-10 left-2 top-[50%]" onClick={handlePrev} />
            <ChevronRight className="absolute w-8 h-8 top-10 z-10 right-2 top-[50%]" onClick={handleNext} />
            <LibSwiper
                ref={swiperRef}
                className="h-[200px] md:h-[420px] rounded-lg flex"
                slidesPerView='auto'
                spaceBetween={30}
                loop={true}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                }}
                modules={[Pagination, Navigation, Autoplay]}
            >
                {queue.map(el => (
                    <SwiperSlide key={el.key} className="rounded-lg w-2/6">
                        <Image
                            className="object-cover h-full w-full rounded-lg"
                            src="https://jabko.ua/image/cache/cataloge-2/silder-2/PC-22/dyson%20(1)-max-1700.jpg.webp"
                            width={1680}
                            height={1080}
                            alt="offer"
                        />
                    </SwiperSlide>
                ))}
            </LibSwiper>
        </section>
    );
};