import type {Product, UpdateProductData} from "@/types/product.interface";
import {INITIAL_PRODUCT} from "@containers/workshop/layout/constant";

export const getInitialProductState = (product?: Product): UpdateProductData => {
    if (!product) return INITIAL_PRODUCT;

    return {
        images: product.images,
        description: product.description,
        quantity: product.quantity,
        name: product.name,
        // TEMP: Need multiple categories support
        categoryId: product.categories[0].id,
        price: product.price,
        weight: 0,
    }
}