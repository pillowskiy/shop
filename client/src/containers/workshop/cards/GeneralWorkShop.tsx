import type {FC} from 'react';
import type {UpdateProductData} from "@/types/product.interface";

import {FormInput} from "@components/FormInput";
import {NumberFormInput} from "@components/NumberFormInput";;
import {Button} from "@ui/Button";
import {Card} from "@common/Card";
import {FormSwitchBox} from "@components/FormSwitch";
import {CreateProductDialog} from "@containers/dialog/CreateProductDialog";

interface GeneralWorkShopProps {
    updateProduct: (values: Partial<UpdateProductData>) => void;
    newProduct: UpdateProductData;
    isProductExist: boolean;
}

export const GeneralWorkShop: FC<GeneralWorkShopProps> = ({updateProduct, newProduct, isProductExist}) => {
    return (
        <Card className="relative row-span-2 bg-popover shadow-md px-4 py-2">
            <h2 className="text-3xl font-bold mt-2">Product workshop</h2>

            <hr className="my-2"/>

            <FormInput
                className="bg-white"
                placeholder="Product name"
                value={newProduct.name}
                onChange={({target}) => updateProduct({ name: target.value })}
                required
            />
            <FormInput
                className="bg-white"
                placeholder="SKU"
                disabled
            />
            <FormInput
                className="bg-white"
                placeholder="Visibility"
                disabled
            />
            <section className="flex justify-between gap-4 w-fit md:w-full">
                <NumberFormInput
                    label="Weight (KG)"
                    setValue={(step) => updateProduct({weight: step + newProduct.weight})}
                    onChange={({target}) => updateProduct({weight: +target.value})}
                    step={0.2}
                    min={0}
                    value={newProduct.weight}
                    required
                />
                <NumberFormInput
                    label="Quantity"
                    setValue={(step) => updateProduct({quantity: step + newProduct.quantity})}
                    onChange={({target}) => updateProduct({quantity: +target.value})}
                    step={1}
                    min={0}
                    value={newProduct.quantity}
                    required
                />
                <NumberFormInput
                    label="Price (USD)"
                    setValue={(step) => updateProduct({price: step + newProduct.price})}
                    onChange={({target}) => updateProduct({price: +target.value})}
                    step={1}
                    min={0}
                    value={newProduct.price}
                    required
                />
            </section>
            <FormInput className="bg-white" placeholder="Categories" required/>

            <hr className="my-2"/>

            <FormSwitchBox label="Item used" />
            <FormSwitchBox label="The product is damaged" />

            <hr className="my-2"/>

            <FormSwitchBox
                label="The product is for sale"
                disabled={!newProduct.quantity}
                defaultChecked={!!newProduct.quantity}
            />
            <p className="text-xs mt-1">To publish a product, click on the switch above</p>

            <footer className="md:absolute bottom-0 w-full left-0 md:px-4 md:py-2">
                <hr className="my-2" />
                <CreateProductDialog>
                    <Button>{isProductExist ? "Save" : "Create"}</Button>
                </CreateProductDialog>
                {isProductExist && <Button className="ml-2" variant="destructive">Delete Product</Button>}
            </footer>
        </Card>
    );
};