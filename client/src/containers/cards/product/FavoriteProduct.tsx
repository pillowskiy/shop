import type {FC} from 'react';
import type {Product} from "@/types/product.interface";
import Image from "next/image";
import {cn} from "@lib/utils";
import {FavoriteButton} from "@containers/product/FavoriteButton";
import {Card} from "@common/Card";
import {Badge} from "@ui/Badge";
import {useRouter} from "next/router";
import {CartButton} from "@containers/product/CartButton";
import {QuantityBadge} from "@containers/cards/product/layout/QuantityBadge";

interface FavoriteProductProps {
    product: Product;
}
// TODO: Remove the absolute position
export const FavoriteProduct: FC<FavoriteProductProps> = ({product}) => {
    const router = useRouter();

    return (
        <Card
            className={cn(
                "relative flex flex-col justify-start md:flex-row md:items-center my-0 mx-auto border mt-4 rounded-lg shadow-sm bg-popover",
                "hover:shadow-xl hover:bg-muted transition-all duration-200 border h-fit md:h-[100px] p-2 md:p-0", {
                    "opacity-90": !product.quantity,
                }
            )}
        >
            <Image
                className="float-left rounded-lg md:rounded-l-lg h-[64px] w-[64px] md:h-full md:w-auto cursor-pointer"
                src={product.images[0]}
                alt={"product image"}
                width={128}
                height={128}
                onClick={() => router.push(`/products/${product.slug}`)}
            />
            <div
                className="md:w-3/12 w-7/12 ml-4 absolute left-[64px] md:static cursor-pointer max-h-[64px]"
                onClick={() => router.push(`/products/${product.slug}`)}
            >
                <p className="hover:underline transition-all">
                    {/* TEMP Bad thing */}
                    {product.name.length > 22 ? product.name.slice(0, 26).concat("..") : product.name}
                    <QuantityBadge quantity={product.quantity} />
                </p>
                {/* TEMP Bad thing */}
                <p className="text-xs">{product.description?.slice(0, 56).concat("..")}</p>
            </div>

            <CartButton className="ml-auto mt-2 md:mt-0 w-full md:w-fit" product={product}/>
            <FavoriteButton className="w-10 h-10 absolute md:relative right-0 mx-4" productId={product.id}/>
        </Card>
    );
};