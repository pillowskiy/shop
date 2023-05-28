import {type FC, useEffect, useState} from "react";
import type {Product, UpdateProductData} from "@/types/product.interface";
import {getInitialProductState} from "@containers/product/containers/workshop/util";
import {useRouter} from "next/router";
import {isEquals} from "@lib/object";

import {UnsavedChangesDialog} from "@containers/dialog/UnsavedChangesDialog";

import {GeneralCard} from "./cards/GeneralCard";
import {ImageUploadCard} from "./cards/ImageUploadCard";
import {TextareaCard} from "./cards/TextareaCard";
import {useMutation} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import FormData from "form-data";

interface ProductWorkShopProps {
    product: Product | undefined;
}

export const ProductWorkShop: FC<ProductWorkShopProps> = ({product}) => {
    const [newProduct, setNewProduct] = useState<UpdateProductData>(getInitialProductState(product));
    const [images, setImages] = useState<{ preview: string, file: File }[]>([]);
    const updateProduct = (values: Partial<UpdateProductData>) => {
        setNewProduct({...newProduct, ...values});
    }

    const dynamicRoute = useRouter().asPath;

    const {mutate: upsertMutation} = useMutation(
        ['upsert product'],
        ({formData}: {formData: FormData}) => (
            ProductService.upsert(formData, product?.id)
        )
    );

    const handleUpload = async () => {
        const formData = new FormData();
        images.forEach(({file}) => {
            formData.append('files[]', file);
        });

        Object.entries(newProduct).forEach(([key, value]) => {
            formData.append(key, value);
        })

        upsertMutation({formData});
    };

    useEffect(() => {
        setNewProduct(getInitialProductState(product));
    }, [dynamicRoute, product]);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:pb-0">
            {!isEquals(product || {}, newProduct) && <UnsavedChangesDialog/>}
            <GeneralCard
                onConfirm={handleUpload}
                updateProduct={updateProduct}
                newProduct={newProduct}
                productId={product?.id}
            />
            <section className="grid grid-rows-2 gap-4 row-span-2">
                <ImageUploadCard
                    images={[...newProduct.images, ...images.map(({preview}) => preview)]}
                    setImages={(files) => {
                        const newImages = Array.from(files, (file => ({
                            preview: URL.createObjectURL(file),
                            file,
                        })))
                        setImages([...images, ...newImages])
                    }}
                />
                <TextareaCard
                    description={newProduct.description}
                    setDescription={(description) => updateProduct({description})}
                />
            </section>
        </section>
    );
};