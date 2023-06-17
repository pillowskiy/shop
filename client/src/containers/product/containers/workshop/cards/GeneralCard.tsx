import type {FC} from 'react';
import type {UpdateProductData} from "@/types/product.interface";

import {FormInput} from "@components/FormInput";
import {NumberFormInput} from "@components/NumberFormInput";

import {Card} from "@common/Card";
import {FormSwitchBox} from "@components/FormSwitch";
import {DeleteButton} from "@containers/product/layout/DeleteButton";
import {WorkshopSubmitButton} from "@containers/product/containers/workshop/layout/WorkshopSubmit";
import {CategorySelect} from "@containers/product/containers/workshop/layout/CategorySelect";
import {useContext, useState} from "react";
import {WorkShopContext} from "@containers/product/containers/workshop";

interface GeneralCardProps {
    updateProduct: (values: Partial<UpdateProductData>) => void;
    onConfirm: () => void;
}

export const GeneralCard: FC<GeneralCardProps> = ({updateProduct, onConfirm}) => {
    const [isDiscount, setIsDiscount] = useState(false);
    const {product, newProduct, errors} = useContext(WorkShopContext);

    return (
        <Card className="relative row-span-2 bg-popover shadow-md px-4 py-2">
            <h2 className="text-3xl font-bold mt-2">Product workshop</h2>

            <hr className="my-2"/>

            <FormInput
                className="bg-white"
                placeholder="Product name"
                value={newProduct.name}
                error={errors.name}
                onChange={({target}) => updateProduct({name: target.value})}
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
            <div>
                {errors.quantity && <p className="text-destructive">{errors.quantity}</p>}
                {errors.price && <p className="text-destructive">{errors.price}</p>}
            </div>
            <CategorySelect
                selectedCategories={newProduct.categories}
                setCategories={(categories) => updateProduct({categories})}
            />
            {errors.categories && <p className="text-destructive">{errors.categories}</p>}

            <hr className="my-2"/>

            <FormSwitchBox label="Item used"/>
            <FormSwitchBox label="The product is damaged"/>

            <hr className="my-2"/>
            <FormSwitchBox
                label="Discounted product"
                onCheckedChange={(checked) => {
                    setIsDiscount(checked);
                    if (!checked) updateProduct({ discountPercent: 0 })
                }}
                checked={isDiscount}
            />
            <FormInput
                className="px-0 appearance-none h-3 bg-white range-lg outline-0 border rounded-xl cursor-w-resize"
                type="range"
                label={`Discount - ${newProduct.discountPercent || 0}%`}
                value={newProduct.discountPercent || 0}
                onChange={({target}) => {
                    if (!+target.value) setIsDiscount(false);
                    updateProduct({ discountPercent: +target.value });
                }}
                disabled={!isDiscount}
                min={0}
                max={99}
            />
            {errors.discountPercent && <p className="text-destructive">{errors.discountPercent}</p>}
            <hr className="my-2"/>

            <FormSwitchBox
                label="The product is for sale"
                disabled={!newProduct.quantity}
                defaultChecked={!!newProduct.quantity}
            />
            <p className="text-xs mt-1">To publish a product, click on the switch above</p>

            <footer className="w-full md:py-2">
                <hr className="my-2"/>
                <div className="flex flex-col md:flex-row gap-2">
                    <WorkshopSubmitButton isProductExist={!!product} onConfirm={onConfirm}/>
                    {product && (
                        <DeleteButton variant="destructive" productId={product.id}>
                            Delete
                        </DeleteButton>
                    )}
                </div>
            </footer>
        </Card>
    );
};