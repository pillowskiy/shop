import type {UpdateProductData} from "@/types/product.interface";
import {useMutation} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";

export const useWorkshopMutation = (newProduct: UpdateProductData, productId?: number) => {
    const {mutate} = useMutation(
        ['upsert product'],
        () => ProductService.upsert(newProduct, productId)
    );

    return {
        mutate,
    }
}