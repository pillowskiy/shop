import type {FC} from 'react';
import {Swiper} from "@containers/swiper/layout/Swiper";
import {SwiperItem} from "@containers/swiper/layout/SwiperItem";
import {useEffect, useState} from "react";
import Image from "next/image";

const ITEMS = [
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
    {
        key: 6,
        color: 'bg-purple-500'
    },
];

const imageSrc = (index: number) => {
    const srcs = [
        "https://assets.xboxservices.com/assets/a5/ce/a5cee5a4-cd02-4212-a3c5-396c0c98f62b.jpg?n=GamePassPCGames.jpg",
        "https://static.vecteezy.com/system/resources/thumbnails/003/240/364/small/shopping-online-on-phone-paper-art-modern-pink-background-gifts-box-free-vector.jpg",
        "https://img.freepik.com/free-vector/shopping-time-banner-with-realistic-map-cart-gift-bags-vector-illustration_548887-120.jpg",
        "https://img.freepik.com/free-vector/online-shopping-horizontal-banner-illustration_1284-57252.jpg",
        "https://img.freepik.com/free-vector/online-shopping-horizontal-banner-illustration_1284-57252.jpg",
    ];
    return srcs[index] || srcs[0];
}

/**
 * Carousel element for interesting offers without any libraries.
 *
 *     TEMPORARY! This component was created temporarily to show the conceptual carousel.
 *
 *     Other libraries are not able to play with the flexbox of individual slides,
 *     so I had to create my own component of a carousel.
 *
 *     The problem with this component is that it renders every 2 seconds,
 *     although this is not surprising since changing the state of items will in any case
 *     cause the component to re-render, but now it's not time.
 *
 * @beta Not for production!
 */
export const Carousel: FC = () => {
    const [items, setItems] = useState(ITEMS);
    useEffect(() => {
        setTimeout(() => {
            const newItems = [...items];
            newItems.push(newItems.shift()!);
            setItems(newItems);
            console.log(items.map(item => item.key))
        }, 2000);
    }, [items]);

    return (
        <div className="relative w-full rounded-lg flex flex-col justify-center">
            <Swiper>
                {items.map((item, i) => (
                    <SwiperItem key={item.key}>
                        <Image
                            className="object-cover h-full w-full rounded-lg"
                            src={imageSrc(item.key - 1)}
                            width={1680}
                            height={920}
                            alt="offer"
                        />
                    </SwiperItem>
                ))}
            </Swiper>
        </div>
    );
};