import {UpdateProductData, UpdateProductDataErrors} from "@/types/product.interface";

export const INITIAL_PRODUCT: UpdateProductData = {
    name: "",
    description: "",
    price: 0,
    weight: 0,
    quantity: 0,
    images: [],
    categoryId: 0
}

export const INITIAL_PRODUCT_ERRORS: UpdateProductDataErrors = {
    name: "",
    description: "",
    price: "",
    weight: "",
    quantity: "",
    images: "",
    categoryId: "",
}
