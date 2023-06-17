import {UpdateProductData, UpdateProductDataErrors} from "@/types/product.interface";

export const INITIAL_PRODUCT: UpdateProductData = {
    name: "",
    description: "",
    price: 0,
    weight: 0,
    quantity: 0,
    discountPercent: 0,
    images: [],
    categories: []
}

export const INITIAL_PRODUCT_ERRORS: UpdateProductDataErrors = {
    name: "",
    description: "",
    price: "",
    weight: "",
    quantity: "",
    images: "",
    discountPercent: "",
    categories: "",
}
