import type {FC} from 'react';
import {cn} from "@lib/utils";
import {Button} from "@ui/Button";
import {ShoppingCart, Zap} from "lucide-react";
import {FavoriteButton} from "@containers/FavoriteButton";
import {ProductFullest} from "@types/product.interface";

interface ProductTradeContainerProps {
    product: ProductFullest;
}

export const ProductTradeButtons: FC<ProductTradeContainerProps> = ({product}) => {
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
                <Button className="w-10/12" variant="secondary">
                    <ShoppingCart className="font-normal"/>
                    <p className="font-medium ml-1">Add to cart!</p>
                </Button>
                <FavoriteButton className="w-10 h-10 ml-auto" productId={product.id}/>
            </div>
        </section>
    );
};