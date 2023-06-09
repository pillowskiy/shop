import React, {useContext} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@common/Card";
import {FormInput} from "@components/FormInput";
import {Button} from "@ui/Button";
import {EditAvatarPopover} from "@containers/user/layout/EditAvatarPopover";
import {Label} from "@ui/Label";
import {Textarea} from "@ui/Textarea";
import {RadioGroup, RadioGroupItem} from "@common/RadioGroup";
import {DialogClose} from "@radix-ui/react-dialog";
import {AccountContext} from "@containers/user/tabs/account/AccountTab";

export const ProfileTab = () => {
    const profile = useContext(AccountContext);
    if (!profile) return null;

    return (
        <Card className="bg-popover animate-card-in px-1">
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                    Make changes to your account here. Click save when you are done.
                </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-y-auto rounded-lg">
                <FormInput className="bg-white" label="User Name" defaultValue={profile.name}/>
                <FormInput className="bg-white" label="Phone number" type="tel"/>
                <FormInput className="bg-white" label="Email" defaultValue={profile.email} type="email"/>

                <section className="flex gap-2 items-center mt-4">
                    <Button className="flex-1" variant="link">Remove Avatar</Button>
                    <EditAvatarPopover>
                        <Button className="flex-1 mt-2">Change Avatar</Button>
                    </EditAvatarPopover>
                </section>

                <hr className="my-4"/>

                <Label>About me</Label>
                <Textarea
                    className="bg-white mt-2"
                    placeholder="Write something.."
                    maxLength={256}
                />

                <FormInput className="bg-white cursor-pointer" placeholder="Day" type="date" label="Born Date"/>

                <section className="mt-4">
                    <Label>Sex</Label>
                    <RadioGroup className="space-y-1 my-2" defaultValue="unknown">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem className="bg-white" value="male" id="male"/>
                            <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem className="bg-white" value="female" id="female"/>
                            <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem className="bg-white" value="unknown" id="unknown"/>
                            <Label htmlFor="unknown">Not specified</Label>
                        </div>
                    </RadioGroup>
                </section>
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