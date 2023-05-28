import {type FC, useEffect, useState} from "react";
import type {Product, UpdateProductData} from "@/types/product.interface";
import {getInitialProductState} from "@containers/product/containers/workshop/util";
import {useRouter} from "next/router";
import {isEquals} from "@lib/object";

import {UnsavedChangesDialog} from "@containers/dialog/UnsavedChangesDialog";

import {GeneralCard} from "./cards/GeneralCard";
import {ImageUploadCard} from "./cards/ImageUploadCard";
import {TextareaCard} from "./cards/TextareaCard";
import {useWorkshopMutation} from "@containers/product/containers/workshop/hook";

interface ProductWorkShopProps {
    product: Product | undefined;
}

export const ProductWorkShop: FC<ProductWorkShopProps> = ({product}) => {
    // TEMP: Create context
    const [newProduct, setNewProduct] = useState<UpdateProductData>(getInitialProductState(product));

    const updateProduct = (values: Partial<UpdateProductData>) => {
        setNewProduct({...newProduct, ...values});
    }

    const mutation = useWorkshopMutation(newProduct);

    const dynamicRoute = useRouter().asPath;
    useEffect(() => {
        setNewProduct(getInitialProductState(product));
    }, [dynamicRoute, product]);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:pb-0">
            {!isEquals(product || {}, newProduct) && <UnsavedChangesDialog/>}
            <GeneralCard
                onConfirm={mutation.mutate}
                updateProduct={updateProduct}
                newProduct={newProduct}
                productId={product?.id}
            />
            <section className="grid grid-rows-2 gap-4 row-span-2">
                <ImageUploadCard
                    images={newProduct.images}
                    setImages={(images) => updateProduct({images: [...newProduct.images, ...images]})}
                />
                <TextareaCard
                    description={newProduct.description}
                    setDescription={(description) => updateProduct({description})}
                />
            </section>
        </section>
    );
};