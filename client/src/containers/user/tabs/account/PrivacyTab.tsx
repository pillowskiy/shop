import type {FC} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@common/Card";
import {FormInput} from "@components/FormInput";
import {Button} from "@ui/Button";
import {EditAvatarPopover} from "@containers/user/layout/EditAvatarPopover";
import {Label} from "@ui/Label";
import {Textarea} from "@ui/Textarea";
import {RadioGroup, RadioGroupItem} from "@common/RadioGroup";
import {Checkbox} from "@ui/Checkbox";
import {DialogClose} from "@radix-ui/react-dialog";
import React, {useContext} from "react";
import {AccountContext} from "@containers/user/tabs/account/AccountTab";
import {Select, SelectGroup, SelectValue} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectLabel, SelectTrigger} from "@common/Select";

export const PrivacyTab: FC = () => {
    const profile = useContext(AccountContext);
    if (!profile) return null;

    return (
        <Card className="bg-popover animate-card-in px-1">
            <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>
                    Control who can see your profile information and activities.
                </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-y-auto rounded-lg">
                <div className="items-top flex space-x-2">
                    <Checkbox className="bg-white" id="age" defaultChecked/>
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="age"
                            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Receive the site newsletter
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Receive emails from the cite administration intended for all users.
                        </p>
                    </div>
                </div>
                <div className="items-top flex space-x-2 mt-2">
                    <Checkbox className="bg-white" id="age" defaultChecked/>
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="age"
                            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Receive the site promotions
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Receive news of new discounts and promotions.
                        </p>
                    </div>
                </div>

                <hr className="my-4"/>

                <div className="items-top flex space-x-2">
                    <Checkbox className="bg-white" id="age" defaultChecked/>
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="age"
                            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Show age
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Allow other users to see your age.
                        </p>
                    </div>
                </div>
                <div className="items-top flex space-x-2 mt-2">
                    <Checkbox className="bg-white" id="birth" defaultChecked/>
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="birth"
                            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Show date of birth
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Allow other users to see your date of birth.
                        </p>
                    </div>
                </div>

                <hr className="my-4"/>

                <Select>
                    <Label className="text-sm">Who can view your newsfeed?</Label>
                    <SelectTrigger className="w-full bg-white mt-2" defaultValue="all">
                        <SelectValue placeholder="Select something" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">All visitors</SelectItem>
                            <SelectItem value="registered">Registered users only</SelectItem>
                            <SelectItem value="followers">Subscribers only</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between">
                <DialogClose asChild>
                    <Button variant="secondary">Close</Button>
                </DialogClose>
                <Button>Save changes</Button>
            </CardFooter>
        </Card>
    );
};