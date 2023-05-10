import type {FC} from 'react';
import type {ProductFullest} from "@types/product.interface";
import {Card, CardContent} from "@common/Card";
import {FavoriteButton} from "./layout/FavoriteButton";
import {ProductRating} from "./layout/ProductRating";

interface ProductItemProps {
    product: ProductFullest;
}

export const ProductItem: FC<ProductItemProps> = ({product}) => {
    return (
        <Card className="flex-card max-w-1/2 lg:max-w-1/3 xl:max-w-none shadow-md rounded-lg duration-500 bg-popover">
            <img className="w-full h-auto object-cover rounded-t-lg" src={product.images[0]} alt={product.name}/>

            <CardContent className="px-custom md:px-4 py-3 w-full">
                <span className="text-muted uppercase text-xs">{product.category.name}</span>
                <p className="text-lg font-bold text-foreground truncate block capitalize">{product.name}</p>
                <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">{product.price}$</p>
                    <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                    </del>
                    <FavoriteButton className="block ml-auto" productId={product.id}/>
                </div>
                <ProductRating product={product}/>
            </CardContent>
        </Card>
    );
};