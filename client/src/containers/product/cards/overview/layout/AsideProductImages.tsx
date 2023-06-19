import {type FC, useContext, useState} from 'react';
import {AsideProductContainer} from "@containers/product/cards/overview/containers/AsideProductContainer";
import Image from "next/image";
import {cn} from "@lib/utils";
import {OverviewProductContext} from "@containers/product/cards/overview/OverviewProductCard";

export const AsideProductImages: FC = () => {
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const product = useContext(OverviewProductContext);

    // TEMP
    if (!product) return null;

    return (
        <AsideProductContainer>
            <Image
                className="w-full h-[300px] sm:w-[520px] sm:h-[420px] md:h-[300px] xl:h-[400px] border rounded-lg object-cover object-top cursor-pointer"
                src={product.images[mainImageIndex]}
                alt={"product image"}
                width={880}
                height={880}
            />

            <section className="flex flex-card gap-4 my-4 max-h-fit overflow-x-auto">
                {product.images.map((src, index) => (
                    <Image
                        className={cn(
                            "rounded-lg cursor-pointer border transition-all object-cover object-top",
                            "w-[64px] h-[64px] md:w-[96px] md:h-[96px] hover:border-foreground", {
                                'border-foreground shadow-md': mainImageIndex === index
                            }
                        )}
                        onClick={() => setMainImageIndex(index)}
                        key={Math.random() * Date.now()}
                        src={src}
                        alt="Product Image"
                        width={256}
                        height={256}
                    />
                ))}
            </section>
        </AsideProductContainer>
    );
};