import type {Product, UpdateProductData} from "@/types/product.interface";
import {useMutation} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";

export const useWorkshopMutation = (newProduct: UpdateProductData, product: Product | undefined) => {
    console.log(newProduct);

    const {mutate: deleteProductMutation} = useMutation(
        ['delete product'],
        ({productId}: { productId: number }) => (
            ProductService.delete(productId)
        ),
    )

    const {mutate: updateProductMutation} = useMutation(
        ['update product'],
        ({productId}: { productId: number }) => (
            ProductService.update(productId, newProduct)
        ), {
            onSuccess: ({data}) => data,
            onError: (_, {productId}) => {
                if (!product) deleteProductMutation({productId})
            }
        });

    const {mutate: createProductMutation} = useMutation(
        ['create product'],
        () => ProductService.create(), {
            onSuccess: ({data}) => updateProductMutation({productId: data}),
        });

    return {
        mutate: () => {
            product ?
                updateProductMutation({productId: product.id}) :
                createProductMutation();
        },
        deleteProductMutation,
        updateProductMutation,
    }
}