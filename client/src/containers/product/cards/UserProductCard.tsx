import {forwardRef} from 'react';
import type {Product} from "@/types/product.interface";
import {cn} from "@lib/utils";
import {Card} from "@common/Card";
import {useRouter} from "next/router";
import {Button} from "@ui/Button";
import {Edit} from 'lucide-react';
import {useProfile} from "@hooks/useProfile";
import {DeleteButton} from "@containers/product/layout/DeleteButton";
import {ProductHorizontalInfo} from "@containers/product/cards/ProductHorizontalInfo";
import {motion} from "framer-motion";

interface UserProductProps {
    product: Product;
    ownerId: number;
}

const UserProductCard = forwardRef<HTMLDivElement, UserProductProps>(({product, ownerId}, ref) => {
    const {profile} = useProfile();
    const router = useRouter();

    return (
        <Card
            ref={ref}
            className={cn(
                "relative flex flex-col justify-start md:flex-row md:items-center my-0 mx-auto border mt-4 rounded-lg shadow-sm bg-popover",
                "hover:shadow-xl hover:bg-muted transition-all duration-200 border h-fit md:h-[98px] p-2 md:p-0", {
                    "opacity-90": !product.quantity,
                }
            )}
        >
            <ProductHorizontalInfo product={product} />

            {
                profile?.id === ownerId &&
                <>
                    <Button
                        className="ml-auto mt-2 md:mt-0 w-full md:w-fit"
                        onClick={() => router.push(`/products/workshop/${product.id}`)}
                    >
                        <Edit/>
                        <p className="ml-2">Edit</p>
                    </Button>
                    <DeleteButton
                        className="hidden md:block mx-4"
                        variant="secondary"
                        productId={product.id}
                    />
                </>
            }
        </Card>
    );
});

UserProductCard.displayName = "UserProductCard";
const MUserProductCard = motion<UserProductProps>(UserProductCard);
export {UserProductCard, MUserProductCard};