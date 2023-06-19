import {type FC, useContext} from 'react';
import {cn} from "@lib/utils";
import {Button} from "@ui/Button";
import {Zap} from "lucide-react";
import {FavoriteButton} from "@containers/product/layout/FavoriteButton";
import {CartButton} from "@containers/cart/layout/CartButton";
import {HoverInfoCard} from "@components/HoverInfoCard";
import {OverviewProductContext} from "@containers/product/cards/overview/OverviewProductCard";

export const ProductTradeButtons: FC = () => {
    const product = useContext(OverviewProductContext);

    // TEMP
    if (!product) return null;

    return (
        <section
            className={cn(
                "flex gap-4 flex-col lg:flex-row w-full",
                "pt-4 md:mt-4 "
            )}
        >
            <HoverInfoCard
                title="The product is out of stock"
                description="Sorry, this product is out of stock"
                disabled={!!product.quantity}
            >
                <div className="w-full lg:w-1/2">
                    <Button className="w-full" disabled={!product.quantity}>
                        <Zap className="font-normal"/>
                        <p className="font-medium ml-1">Buy now!</p>
                    </Button>
                </div>
            </HoverInfoCard>

            <div className="w-full lg:w-1/2 flex gap-4">
                <CartButton className="flex-1" variant="secondary" product={product} />
                <FavoriteButton className="w-10 h-10 ml-auto" productId={product.id}/>
            </div>
        </section>
    );
};