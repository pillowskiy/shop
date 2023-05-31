import type {Product, UpdateProductData} from "@/types/product.interface";
import {INITIAL_PRODUCT} from "@containers/product/containers/workshop/constant";

export const getInitialProductState = (product?: Product): UpdateProductData => {
    if (!product) return INITIAL_PRODUCT;

    return {
        images: product.images,
        description: product.description,
        quantity: product.quantity,
        name: product.name,
        categories: product.categories.map(({id}) => id),
        price: product.price,
        weight: 0,
    }
}