import type {FC} from 'react';
import type {Product} from "@/types/product.interface";
import Image from "next/image";
import {cn} from "@lib/utils";
import {Anchor} from "@ui/Anchor";
import {Button} from "@ui/Button";
import {FavoriteButton} from "@containers/cards/product/layout/FavoriteButton";
import {ShoppingCart} from 'lucide-react';
import {Card} from "@common/Card";
import {Badge} from "@ui/Badge";
import {useRouter} from "next/router";

interface FavoriteItemProps {
    product: Product;
}

export const FavoriteItem: FC<FavoriteItemProps> = ({product}) => {
    const router = useRouter();

    return (
        <Card
            className={cn(
                "relative flex flex-col justify-start md:flex-row md:items-center my-0 mx-auto border mt-4 rounded-lg shadow-sm bg-popover",
                "hover:shadow-xl hover:bg-muted transition-all duration-200 border h-fit md:h-[100px] p-2 md:p-0 cursor-pointer", {
                    "opacity-90": !product.quantity,
                }
            )}
            onClick={() => router.push(`/products/${product.slug}`)}
        >
            <Image
                className="float-left rounded-lg md:rounded-l-lg h-[64px] w-[64px] md:h-full md:w-auto"
                src={product.images[0]}
                alt={"product image"}
                width={128}
                height={128}
            />
            <div className="md:w-3/12 ml-4 absolute left-[64px] md:static">
                <Anchor href={`/products/${product.slug}`}>
                    {product.name}
                    {!product.quantity &&
                        <Badge className="h-4 px-2 py-2.5 absolute ml-1" variant="secondary">Out of stock ❌</Badge>}
                </Anchor>
                <p className="text-xs">{product.description?.slice(0, 56).concat("..")}</p>

            </div>
            <Button className="ml-auto mt-2 md:mt-0 w-full md:w-fit" disabled={!product.quantity}>
                <ShoppingCart/>
                <p className="ml-2">Add to cart</p>
            </Button>
            <FavoriteButton className="w-10 h-10 absolute md:relative right-0 mx-4" productId={product.id}/>
        </Card>
    );
};