import {createContext, type FC, useEffect, useState} from "react";
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
import {buildToast, useToast} from "@common/toast/useToast";
import {Loader} from "@containers/Loader";

interface ProductWorkShopProps {
    product: Product | undefined;
}

interface WorkShopContextValue extends ProductWorkShopProps {
    newProduct: UpdateProductData;
    errors: UpdateProductDataErrors;
}

export const WorkShopContext = createContext<WorkShopContextValue | null>(null);

export const ProductWorkShop: FC<ProductWorkShopProps> = ({product}) => {
    const [newProduct, setNewProduct] = useState<UpdateProductData>(getInitialProductState(product));
    const [errors, setErrors] = useState<UpdateProductDataErrors>(INITIAL_PRODUCT_ERRORS)
    const [images, setImages] = useState<{ preview: string, file: File }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const updateProduct = (values: Partial<UpdateProductData>) => {
        setNewProduct({...newProduct, ...values});
    }

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
                    toast(buildToast("error", {
                        error: err.response?.data?.message || "Unhandled error"
                    }).toast);
                }
            },
            onSuccess: ({data}) => {
                toast(buildToast("product.workshop.success", {
                    action: product ? "updated" : "created"
                }).toast);
                setNewProduct(getInitialProductState(data));
                setImages([]);
            },
            onSettled: () => setTimeout(() => setIsLoading(false), 200)
        }
    );

    const handleUpload = async () => {
        const formData = new FormData();
        setErrors(INITIAL_PRODUCT_ERRORS);
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
    }, [product]);

    if (isLoading) return <Loader/>

    return (
        <WorkShopContext.Provider value={{ product, newProduct, errors }}>
            <section className="grid md:grid-cols-2 gap-4 mt-4 md:pb-0 max-w-[1080px]">
                {!isEquals(getInitialProductState(product), newProduct) && <UnsavedChangesDialog/>}
                <GeneralCard
                    onConfirm={handleUpload}
                    updateProduct={updateProduct}
                />
                <section className="grid grid-rows-[2fr 1fr] gap-4 row-span-2">
                    <ImageUploadCard
                        images={[...newProduct.images, ...images.map(({preview}) => preview)]}
                        setImages={(files) => {
                            const newImages = Array.from(files, (file => ({
                                preview: URL.createObjectURL(file),
                                file,
                            })))
                            setImages([...images, ...newImages])
                        }}
                        deleteImage={(src) => {
                            // TEMP
                            setImages(images => images.filter(({preview}) => preview !== src))
                            updateProduct({ images: newProduct.images.filter(image => image !== src)})
                        }}
                    />
                    <TextareaCard
                        setDescription={(description) => updateProduct({description})}
                    />
                </section>
            </section>
        </WorkShopContext.Provider>
    );
};