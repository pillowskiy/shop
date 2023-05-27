import type {FC} from 'react';
import {cn} from "@lib/utils";
import {Button} from "@ui/Button";
import {Zap} from "lucide-react";
import {FavoriteButton} from "@containers/product/layout/FavoriteButton";
import {ProductFullest} from "@/types/product.interface";
import {CartButton} from "@containers/product/layout/CartButton";

interface ProductTradeContainerProps {
    product: ProductFullest;
}

export const ProductTradeButtons: FC<ProductTradeContainerProps> = ({product}) => {
    return (
        <section
            className={cn(
                "flex gap-4 flex-col lg:flex-row w-full",
                "pt-4 md:mt-4 "
            )}
        >
            <Button className="w-full lg:w-1/2" disabled={!product.quantity}>
                <Zap className="font-normal"/>
                <p className="font-medium ml-1">Buy now!</p>
            </Button>

            <div className="w-full lg:w-1/2 flex gap-4">
                <CartButton className="flex-1" variant="secondary" product={product} />
                <FavoriteButton className="w-10 h-10 ml-auto" productId={product.id}/>
            </div>
        </section>
    );
};