import {type FC, createContext} from 'react';
import type {Product, ProductFullest} from "@/types/product.interface";
import {ProductBreadcrumb} from "@containers/product/layout/ProductBreadcrumb";
import {AsideProductContainer} from "@containers/product/cards/overview/containers/AsideProductContainer";
import {AsideProductImages} from "@containers/product/cards/overview/layout/AsideProductImages";
import {ProductTradeButtons} from "@containers/product/cards/overview/layout/ProductTradeButtons";
import {ProductFullestInfo} from "@containers/product/cards/overview/layout/ProductFullestInfo";

import {MCard} from "@common/Card";
import {opacityListAnimation} from "@lib/animations";

interface SingleProductProps {
    product: ProductFullest;
}

export const OverviewProductContext = createContext<Product | null>(null);

export const OverviewProductCard: FC<SingleProductProps> = ({product}) => {
    return (
        <MCard
            className="w-full sm:w-[520px] md:w-full lg:w-[920px] xl:w-[1080px] relative md:flex gap-4 p-4 mt-4 bg-popover"
            initial="initial"
            animate="animate"
            custom={1}
            variants={opacityListAnimation}
        >
            <OverviewProductContext.Provider value={product}>
                <AsideProductImages/>
                <AsideProductContainer>
                    <ProductBreadcrumb/>
                    <ProductFullestInfo/>
                    <ProductTradeButtons/>
                </AsideProductContainer>
            </OverviewProductContext.Provider>
        </MCard>
    );
};