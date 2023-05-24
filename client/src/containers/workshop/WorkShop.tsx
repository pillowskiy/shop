import type {FC} from 'react';
import type {Product} from "@/types/product.interface";
import {useState} from "react";
import {UpdateProductData} from "@/types/product.interface";
import {GeneralWorkShop} from "@containers/workshop/cards/GeneralWorkShop";
import {ImageUpload} from "@containers/workshop/cards/ImageUpload";
import {WorkshopTextarea} from "@containers/workshop/cards/WorkshopTextarea";
import {getInitialProductState} from "@containers/workshop/layout/util";

interface WorkShopProps {
    product: Product | undefined;
}

export const WorkShop: FC<WorkShopProps> = ({product}) => {
    const [newProduct, setNewProduct] = useState<UpdateProductData>(getInitialProductState(product));
    const updateProduct = (values: Partial<UpdateProductData>) => {
        setNewProduct({...newProduct, ...values});
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pb-32 md:pb-0">
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