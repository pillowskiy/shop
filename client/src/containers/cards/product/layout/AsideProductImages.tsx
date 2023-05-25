import type {FC} from 'react';
import {AsideProductContainer} from "@containers/cards/product/containers/AsideProductContainer";
import Image from "next/image";

interface AsideProductImagesProps {
    images: string[];
}

export const AsideProductImages: FC<AsideProductImagesProps> = ({images}) => {
    return (
        <AsideProductContainer>
            <Image
                className="sm:w-[520px] md:w-full sm:h-[420px] md:h-auto border rounded-lg object-cover cursor-pointer"
                src={images[0]}
                alt={"product image"}
                width={600}
                height={600}
            />

            <section className="flex flex-card gap-4 my-4 max-h-fit overflow-x-auto">
                {images.map(src => (
                    <Image
                        className="rounded-lg cursor-pointer border w-[64px] h-[64px] md:w-[96px] md:h-[96px] "
                        key={Math.random() * Date.now()}
                        src={src}
                        alt={"product image"}
                        width={90}
                        height={90}
                    />
                ))}
            </section>
        </AsideProductContainer>
    );
};