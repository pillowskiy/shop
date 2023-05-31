import {type FC, useEffect, useState} from "react";
import type {Product, UpdateProductData, UpdateProductDataErrors} from "@/types/product.interface";
import {getInitialProductState} from "@containers/product/containers/workshop/util";
import {useRouter} from "next/router";
import {isEquals} from "@lib/object";

import {UnsavedChangesDialog} from "@containers/dialog/UnsavedChangesDialog";

import {GeneralCard} from "./cards/GeneralCard";
import {ImageUploadCard} from "./cards/ImageUploadCard";
import {TextareaCard} from "./cards/TextareaCard";
import {useMutation} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import {INITIAL_PRODUCT_ERRORS} from "./constant";
import {isAxiosError} from "axios";
import {useToast} from "@common/toast/useToast";
import {Loader} from "@containers/Loader";

interface ProductWorkShopProps {
    product: Product | undefined;
}

export const ProductWorkShop: FC<ProductWorkShopProps> = ({product}) => {
    const [newProduct, setNewProduct] = useState<UpdateProductData>(getInitialProductState(product));
    const [errors, setErrors] = useState<UpdateProductDataErrors>(INITIAL_PRODUCT_ERRORS)
    const [images, setImages] = useState<{ preview: string, file: File }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const updateProduct = (values: Partial<UpdateProductData>) => {
        setNewProduct({...newProduct, ...values});
    }

    const dynamicRoute = useRouter().asPath;
    const {toast} = useToast();
    const router = useRouter();

    const {mutate: upsertMutation} = useMutation(
        ['upsert product'],
        ({formData}: { formData: FormData }) => (
            ProductService.upsert(formData, product?.id)
        ), {
            onError: (err) => {
                if (!isAxiosError(err)) return router.back();
                if (err.response?.data?.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    toast({
                        variant: "destructive",
                        title: "Uh Oh! something went wrong.",
                        description: err.response?.data?.message || "Unhandled error"
                    });
                }
            },
            onSuccess: ({data}) => {
                toast({
                    description: `✅ You successfully ${product ? "updated" : "created"} a product`
                });
                setNewProduct(getInitialProductState(data));
            },
            onSettled: () => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            }
        }
    );

    const handleUpload = async () => {
        const formData = new FormData();
        setErrors(INITIAL_PRODUCT_ERRORS);
        setImages([]);
        setIsLoading(true);
        images.forEach(({file}) => {
            formData.append('files[]', file);
        });

        Object.entries(newProduct).forEach(([key, value]) => {
            formData.append(key, value);
        });

        upsertMutation({formData});
    };

    // TEMP
    useEffect(() => {
        setNewProduct(getInitialProductState(product));
    }, [dynamicRoute, product]);

    if (isLoading) return <Loader/>

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:pb-0 max-w-[1080px]">
            {!isEquals(getInitialProductState(product), newProduct) && <UnsavedChangesDialog/>}
            <GeneralCard
                onConfirm={handleUpload}
                updateProduct={updateProduct}
                errors={errors}
                newProduct={newProduct}
                productId={product?.id}
            />
            <section className="grid grid-rows-2 gap-4 row-span-2">
                <ImageUploadCard
                    images={[...newProduct.images, ...images.map(({preview}) => preview)]}
                    errors={{images: errors.images}}
                    setImages={(files) => {
                        const newImages = Array.from(files, (file => ({
                            preview: URL.createObjectURL(file),
                            file,
                        })))
                        setImages([...images, ...newImages])
                    }}
                />
                <TextareaCard
                    errors={{description: errors.description}}
                    description={newProduct.description}
                    setDescription={(description) => updateProduct({description})}
                />
            </section>
        </section>
    );
};