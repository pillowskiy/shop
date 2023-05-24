import type {FC} from 'react';
import type {Product} from "@/types/product.interface";
import {useEffect, useState} from "react";
import {UpdateProductData} from "@/types/product.interface";
import {GeneralWorkShop} from "@containers/workshop/cards/GeneralWorkShop";
import {ImageUpload} from "@containers/workshop/cards/ImageUpload";
import {WorkshopTextarea} from "@containers/workshop/cards/WorkshopTextarea";
import {getInitialProductState} from "@containers/workshop/util";
import {UnsavedChangesDialog} from "@containers/dialog/UnsavedChangesDialog";
import {isEquals} from "@lib/object";
import {useRouter} from "next/router";

interface WorkShopProps {
    product: Product | undefined;
}

export const WorkShop: FC<WorkShopProps> = ({product}) => {
    const [newProduct, setNewProduct] = useState<UpdateProductData>(getInitialProductState(product));

    const dynamicRoute = useRouter().asPath;
    useEffect(() => {
        setNewProduct(getInitialProductState(product));
    }, [dynamicRoute, product]);

    const updateProduct = (values: Partial<UpdateProductData>) => {
        setNewProduct({...newProduct, ...values});
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pb-32 md:pb-0">
            { !isEquals(product || {}, newProduct) && <UnsavedChangesDialog /> }
            <GeneralWorkShop updateProduct={updateProduct} newProduct={newProduct} isProductExist={!!product}/>
            <section className="grid grid-rows-2 gap-4 row-span-2">
                <ImageUpload
                    images={newProduct.images}
                    setImages={(images) => updateProduct({ images: [...newProduct.images, ...images] })}
                />
                <WorkshopTextarea
                    description={newProduct.description}
                    setDescription={(description) => updateProduct({ description })}
                />
            </section>
        </section>
    );
};