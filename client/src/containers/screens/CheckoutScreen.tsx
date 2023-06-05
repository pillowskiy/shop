import type {FC} from 'react';
import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";
import {Card} from "@common/Card";
import {useCart} from "@hooks/useCart";
import {Button} from "@ui/Button";
import {Anchor} from "@ui/Anchor";
import {MapPin, ChevronRight, Edit} from "lucide-react";
import {RadioGroup, RadioGroupItem} from "@common/RadioGroup";
import {Label} from "@ui/Label";
import {FormInput} from "@components/FormInput";
import {ProductHorizontalInfo} from "@containers/product/cards/overview/layout/ProductHorizontalInfo";
import {cn} from "@lib/utils";
import {CartDialog} from "@containers/cart/dialogs/CartDialog";

export const CheckoutScreen: FC = () => {
    const {items, totalItems, totalCost} = useCart();

    return (
        <Meta title="Checkout">
            <Main className="min-h-screen-64 h-auto flex justify-center">
                <section className="w-full md:w-full lg:w-[920px] xl:w-[1080px] p-4 flex-col sm:flex-row flex gap-4">
                    <section className="w-full sm:w-8/12 lg:w-9/12">
                        <Card
                            className="bg-popover p-4 flex items-center hover:bg-muted hover:shadow-lg transition-all cursor-pointer">
                            <MapPin className="w-8 h-8 opacity-90 mr-2"/>
                            <div>
                                <p className="text-xs opacity-90">Your city:</p>
                                <p className="font-medium">Bunbulandia</p>
                            </div>
                            <ChevronRight className="ml-auto w-6 h-6 opacity-90"/>
                        </Card>
                        <Card className="bg-popover p-4 mt-4">
                            <h2 className="text-2xl font-medium">Order</h2>

                            <hr className="my-2"/>
                            <div className="flex items-center justify-between">
                                <h2 className="font-medium text-xl mb-2">Products:</h2>
                                <CartDialog>
                                    <div className="flex text-primary opacity-90 cursor-pointer md:hover:underline transition-all">
                                        <Edit className="w-5 h-5 mr-1"/>
                                        <p>Edit</p>
                                    </div>
                                </CartDialog>
                            </div>

                            <section
                                className="p-2 relative flex flex-col gap-2 bg-white rounded-lg max-h-[400px] overflow-y-auto">
                                {
                                    items.map(item => (
                                        <Card
                                            key={item.id}
                                            className={cn(
                                                "bg-popover hover:bg-muted hover:shadow-lg transition-all min-w-[260px] w-full",
                                                "relative flex flex-col lg:flex-row lg:justify-between lg:items-center"
                                            )}
                                        >
                                            <ProductHorizontalInfo product={item}/>
                                            <section className="flex justify-between px-2">
                                                <div className="py-2 text-center px-4">
                                                    <h2 className="text-lg leading-5">{item.price}$</h2>
                                                    <p className="text-xs leading-3 m-auto">Price</p>
                                                </div>
                                                <div className="py-2 text-center px-4">
                                                    <h2 className="text-lg leading-5">{item.count}</h2>
                                                    <p className="text-xs leading-3 m-auto">Item(s)</p>
                                                </div>
                                                <div className="py-2 text-center px-4">
                                                    <h2 className="text-lg leading-5">{item.count * item.price}$</h2>
                                                    <p className="text-xs leading-3 m-auto">Amount</p>
                                                </div>
                                            </section>
                                        </Card>
                                    ))
                                }
                            </section>

                            <hr className="my-2"/>
                            <h2 className="font-medium text-xl mb-2">Delivery:</h2>

                            <RadioGroup className="flex flex-col gap-2 p-2 bg-white rounded-lg" defaultValue="courier">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="courier"/>
                                    <Label className="text-lg font-normal">Courier to your address</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="office_a"/>
                                    <Label className="text-lg font-normal">Pickup from the post office A</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="office_b"/>
                                    <Label className="text-lg font-normal">Pickup from the post office B</Label>
                                </div>
                            </RadioGroup>

                            <hr className="my-2"/>
                            <h2 className="font-medium text-xl mb-2">Payment:</h2>

                            <RadioGroup className="flex flex-col gap-2 p-2 bg-white rounded-lg" defaultValue="magic">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="magic"/>
                                    <Label className="text-lg font-normal">Magic card</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="office_a"/>
                                    <Label className="text-lg font-normal">EasyPay</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="office_b"/>
                                    <Label className="text-lg font-normal">Another one method</Label>
                                </div>
                            </RadioGroup>

                            <hr className="my-2"/>
                            <h2 className="font-medium text-xl mb-2">Customer info:</h2>

                            <section className="p-2 bg-white rounded-lg overflow-y-hidden pt-0">
                                <div className="flex gap-4">
                                    <FormInput label="Name"/>
                                    <FormInput label="Surname"/>
                                </div>
                                <div>
                                    <FormInput className="bg-white" label="Phone number"/>
                                </div>
                            </section>
                        </Card>
                    </section>
                    <section className="w-full sm:w-4/12 lg:w-3/12 h-fit sm:sticky top-[72px]">
                        <Card className="bg-popover px-4 pb-4">
                            <FormInput className="bg-white" label="Promo-code" placeholder="SUMMER2023"/>
                            <Button className="mt-2 w-full">Apply</Button>
                        </Card>
                        <Card className="bg-popover p-4 mt-4">
                            <h2 className="font-medium text-xl">Total payable</h2>
                            <hr className="my-2"/>
                            <div className="flex justify-between text-xs">
                                <p className="font-medium">{totalItems} products worth:</p>
                                <p className="ml-50 text-primary opacity-90">{totalCost}$</p>
                            </div>
                            <div className="flex justify-between text-xs mt-2">
                                <p className="font-medium">Delivery cost:</p>
                                <p className="ml-50 text-primary opacity-90">at the carrier tariffs</p>
                            </div>
                            <hr className="my-2"/>
                            <div className="flex justify-between items-center">
                                <p className="font-medium">To be paid</p>
                                <h2 className="text-2xl">{totalCost}$</h2>
                            </div>
                            <hr className="my-2"/>
                            <footer>
                                <Button className="w-full">Confirm the order</Button>

                                <section className="mt-2 text-xs">
                                    <p className="font-medium mb-1">
                                        By confirming the order, I accept the {' '}
                                        <Anchor className="opacity-90" href="#">Regulations on the personal
                                            data</Anchor> {' '}
                                        and {' '} <Anchor className="opacity-90" href="#">User agreements</Anchor></p>
                                </section>
                            </footer>
                        </Card>
                    </section>
                </section>
            </Main>
        </Meta>
    );
};