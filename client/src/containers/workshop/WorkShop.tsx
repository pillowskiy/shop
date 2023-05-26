import type {FC} from 'react';
import type {Product} from "@/types/product.interface";
import type {UpdateProductData} from "@/types/product.interface";

import {useEffect, useState} from "react";
import {useRouter} from "next/router";

import {getInitialProductState} from "@containers/workshop/util";
import {isEquals} from "@lib/object";

import {GeneralCard} from "@containers/workshop/layout/GeneralCard";
import {ImageUploadCard} from "@containers/workshop/layout/ImageUploadCard";
import {TextareaCard} from "@containers/workshop/layout/TextareaCard";

import {UnsavedChangesDialog} from "@containers/dialog/UnsavedChangesDialog";

interface WorkShopProps {
    product: Product | undefined;
}

export const WorkShop: FC<WorkShopProps> = ({product}) => {
    const [newProduct, setNewProduct] = useState<UpdateProductData>(getInitialProductState(product));

    const updateProduct = (values: Partial<UpdateProductData>) => {
        setNewProduct({...newProduct, ...values});
    }

    const dynamicRoute = useRouter().asPath;
    useEffect(() => {
        setNewProduct(getInitialProductState(product));
    }, [dynamicRoute, product]);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:pb-0">
            { !isEquals(product || {}, newProduct) && <UnsavedChangesDialog /> }
            <GeneralCard updateProduct={updateProduct} newProduct={newProduct} isProductExist={!!product}/>
            <section className="grid grid-rows-2 gap-4 row-span-2">
                <ImageUploadCard
                    images={newProduct.images}
                    setImages={(images) => updateProduct({ images: [...newProduct.images, ...images] })}
                />
                <TextareaCard
                    description={newProduct.description}
                    setDescription={(description) => updateProduct({ description })}
                />
            </section>
        </section>
    );
};