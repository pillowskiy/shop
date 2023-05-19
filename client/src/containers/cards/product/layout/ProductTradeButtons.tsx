import type {FC} from 'react';
import {cn} from "@lib/utils";
import {Button} from "@ui/Button";
import {Zap} from "lucide-react";
import {FavoriteButton} from "@containers/product/FavoriteButton";
import {ProductFullest} from "@types/product.interface";
import {CartButton} from "@containers/product/CartButton";

interface ProductTradeContainerProps {
    product: ProductFullest;
}

export const ProductTradeButtons: FC<ProductTradeContainerProps> = ({product}) => {
    console.log(product);

    return (
        <section
            className={cn(
                "flex gap-4 flex-col lg:flex-row w-full",
                "mb-4 bottom-0 pt-4 md:mt-4 md:absolute md:w-1/2 md:pr-6 md:pb-4"
            )}
        >
            <Button className="w-full lg:w-1/2 ">
                <Zap className="font-normal"/>
                <p className="font-medium ml-1">Buy now!</p>
            </Button>

            <div className="w-full lg:w-1/2 flex gap-4">
                <CartButton className="w-10/12" variant="secondary" disabled={!product.quantity} />
                <FavoriteButton className="w-10 h-10 ml-auto" productId={product.id}/>
            </div>
        </section>
    );
};