import type {FC} from 'react';
import type {ProductFullest} from "@/types/product.interface";
import Image from "next/image";
import {cn} from "@lib/utils";
import {Card} from "@common/Card";
import {Badge} from "@ui/Badge";
import {useRouter} from "next/router";
import {useProfile} from "@hooks/useProfile";
import {Button} from "@ui/Button";
import {Trash2, Edit} from 'lucide-react';
import {Toggle} from "@ui/Toggle";
import {StarRating} from "@containers/product/StarRating";
import {useProductRateAvg} from "@hooks/useProductRateAVG";

interface FavoriteProductProps {
    product: ProductFullest;
    ownerId: number;
}
// TODO: Remove the absolute position
export const UserProduct: FC<FavoriteProductProps> = ({product, ownerId}) => {
    const {profile} = useProfile();
    const router = useRouter();
    const rating = useProductRateAvg(product.id);

    return (
        <Card
            className={cn(
                "relative flex flex-col justify-start md:flex-row md:items-center my-0 mx-auto border mt-4 rounded-lg shadow-sm bg-popover",
                "hover:shadow-xl hover:bg-muted transition-all duration-200 border h-fit md:h-[100px] p-2 md:p-0 cursor-pointer", {
                    "opacity-90": !product.quantity,
                }
            )}
        >
            <Image
                className="float-left rounded-lg md:rounded-l-lg h-[64px] w-[64px] md:h-full md:w-auto"
                src={product.images[0]}
                alt={"product image"}
                width={128}
                height={128}
                onClick={() => router.push(`/products/${product.slug}`)}
            />
            <div
                className="md:w-3/12 w-7/12 ml-4 absolute left-[64px] md:static"
                onClick={() => router.push(`/products/${product.slug}`)}
            >
                <p className="hover:underline transition-all">
                    {/* TEMP Bad thing */}
                    {product.name.length > 22 ? product.name.slice(0, 26).concat("..") : product.name}
                    {!product.quantity && (
                        <Badge
                            className="h-4 px-2 py-2.5 absolute ml-1 hidden sm:inline-flex"
                            variant="secondary"
                        >
                            Out of stock ❌
                        </Badge>
                    )}
                </p>
                {/* TEMP Bad thing */}
                <p className="text-xs">{product.description?.slice(0, 56).concat("..")}</p>
            </div>
            <StarRating rating={rating} />

            {
                profile?.id === ownerId &&
                <>
                    <Button className="ml-auto mt-2 md:mt-0 w-full md:w-fit">
                        <Edit />
                        <p className="ml-2">Edit</p>
                    </Button>
                    <Toggle className="w-10 h-10 absolute md:relative right-0 mx-4">
                        <Trash2 className="text-primary"/>
                    </Toggle>
                </>
            }
        </Card>
    );
};