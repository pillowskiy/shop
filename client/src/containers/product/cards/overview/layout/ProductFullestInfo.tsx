import type {FC} from 'react';
import type {ProductFullest} from "@/types/product.interface";
import {ProductRating} from "@containers/product/layout/ProductRating";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@common/Accordion";
import {QuantityBadge} from "@containers/product/layout/QuantityBadge";

interface ProductInfoContainerProps {
    product: ProductFullest;
}

export const ProductFullestInfo: FC<ProductInfoContainerProps> = ({product}) => {
    return (
        <section>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold">
                {product.name}
                <QuantityBadge className="absolute" quantity={product.quantity} />
            </h2>

            <ProductRating className="flex justify-start gap-2 mb-4" product={product}/>

            <span className="text-3xl md:text-5xl font-bold">999$</span>
            <del className="ml-4 text-1xl md:text-2xl font-medium text-muted">{product.price}$</del>

            <Accordion type="single" collapsible className="w-full md:hidden">
                <AccordionItem value="description">
                    <AccordionTrigger className="text-xl font-medium">Description</AccordionTrigger>
                    <AccordionContent className="text-sm">
                        {product.description}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <section className="mt-4 hidden md:block h-fit">
                <h3 className="text-2xl font-medium">Description</h3>
                <span className="text-sm mt-2">{product.description}</span>
            </section>
        </section>
    );
};