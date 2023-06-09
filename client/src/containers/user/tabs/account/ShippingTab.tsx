import type {FC} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@common/Card";
import {FormInput} from "@components/FormInput";
import {DialogClose} from "@radix-ui/react-dialog";
import {Button} from "@ui/Button";
import { UA, DE, FR, PL, GB } from 'country-flag-icons/react/1x1'
import {useContext} from "react";
import {AccountContext} from "@containers/user/tabs/account/AccountTab";

export const ShippingTab: FC = () => {
    const profile = useContext(AccountContext);

    return (
        <Card className="bg-popover animate-card-in">
            <CardHeader>
                <CardTitle>Shipping</CardTitle>
                <CardDescription>
                    Give us your details to automate the delivery.
                </CardDescription>
                <CardContent className="p-1 max-h-[600px] overflow-y-auto rounded-lg">
                    <FormInput className="bg-white" label="Name"/>
                    <FormInput className="bg-white" label="Surname"/>
                    <FormInput className="bg-white" label="Phone number"/>
                    <FormInput className="bg-white" label="Email" defaultValue={profile?.email}/>

                    <hr className="my-4" />
                    <section className="bg-white border p-2 rounded-lg">
                        <p className="font-consolas text-sm text-primary opacity-90 text-center">Popular countries</p>
                        <div className="flex shrink mt-2 gap-4 justify-center">
                            <UA className="w-8 h-8 object-cover rounded-full border md:hover:scale-[1.05] hover:border-green-400 transition-all cursor-pointer" />
                            <DE className="w-8 h-8 object-cover rounded-full border md:hover:scale-[1.05] hover:border-green-400 transition-all cursor-pointer" />
                            <FR className="w-8 h-8 object-cover rounded-full border md:hover:scale-[1.05] hover:border-green-400 transition-all cursor-pointer" />
                            <PL className="w-8 h-8 object-cover rounded-full border md:hover:scale-[1.05] hover:border-green-400 transition-all cursor-pointer" />
                            <GB className="w-8 h-8 object-cover rounded-full border md:hover:scale-[1.05] hover:border-green-400 transition-all cursor-pointer" />
                        </div>
                        <FormInput
                            placeholder="Choose your city"
                            className="bg-popover"
                            label="Specify the settlement"
                        />
                        <CardDescription className="mt-1 text-xs">
                            Make sure your city is in a supported country
                        </CardDescription>
                    </section>
                </CardContent>
                <CardFooter className="px-0 pt-2 flex justify-between">
                    <DialogClose asChild>
                        <Button variant="secondary">Close</Button>
                    </DialogClose>
                    <Button>Save changes</Button>
                </CardFooter>
            </CardHeader>
        </Card>
    );
};