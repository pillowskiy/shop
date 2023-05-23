import type {FC} from 'react';
import type {ProductFullest} from "@/types/product.interface";
import {ProductBreadcrumb} from "@containers/cards/product/layout/ProductBreadcrumb";
import {Card} from "@common/Card";
import {AsideProductContainer} from "@containers/cards/product/containers/AsideProductContainer";
import {AsideProductImages} from "@containers/cards/product/layout/AsideProductImages";
import {ProductTradeButtons} from "@containers/cards/product/layout/ProductTradeButtons";
import {ProductFullestInfo} from "@containers/cards/product/layout/ProductFullestInfo";

interface SingleProductProps {
    product: ProductFullest;
}

export const SingleProduct: FC<SingleProductProps> = ({product}) => {
    return (
        <Card className="w-full sm:w-[520px] md:w-full lg:w-[920px] xl:w-[1080px] relative md:flex gap-4 p-4 mt-4 bg-popover">
            <AsideProductImages images={product.images} />
            <AsideProductContainer>
                <ProductBreadcrumb product={product}/>
                <ProductFullestInfo product={product}/>
                <ProductTradeButtons product={product} />
            </AsideProductContainer>
        </Card>
    );
};