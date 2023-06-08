import type {FC} from "react";
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@common/Card"
import {Input} from "@ui/Input"
import {Label} from "@ui/Label"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@common/Tabs"
import {FormInput} from "@components/FormInput";
import {useProfile} from "@hooks/useProfile";
import {EditAvatarPopover} from "@containers/user/layout/EditAvatarPopover";
import {RadioGroup, RadioGroupItem} from "@common/RadioGroup";
import {Checkbox} from "@ui/Checkbox";
import {Textarea} from "@ui/Textarea";

export const AccountTab: FC = () => {
    const {profile} = useProfile();

    return (
        <Tabs defaultValue="account" className="w-full md:w-[500px] h-full md:h-fit">
            <TabsList className="flex gap-1 w-full md:w-[500px] overflow-x-auto justify-start sm:justify-center h-fit">
                <TabsTrigger value="account">Profile</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="notification">Notification</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="black_list">Black List</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card className="bg-popover">
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                            Make changes to your account here. Click save when you are done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="max-h-[600px] overflow-y-auto rounded-lg">
                        <FormInput className="bg-white" label="User Name" defaultValue={profile?.name} />
                        <FormInput className="bg-white" label="Phone number" defaultValue={profile?.phone || ""} />
                        <FormInput className="bg-white" label="Email" defaultValue={profile?.email} />

                        <section className="flex gap-2 items-center mt-2">
                            <Button className="flex-1" variant="link">Remove Avatar</Button>
                            <EditAvatarPopover>
                                <Button className="flex-1 mt-2">Change Avatar</Button>
                            </EditAvatarPopover>
                        </section>
                        <hr className="my-4"/>

                        <Label>About me</Label>
                        <Textarea
                            className="bg-white my-2"
                            placeholder="Write something.."
                            maxLength={256}
                        />

                        <Label>Born Date</Label>
                        <section className="flex gap-2 -mt-2 mb-2 justify-between items-center">
                            <FormInput className="bg-white" placeholder="Day"/>
                            <FormInput className="bg-white" placeholder="Month"/>
                            <FormInput className="bg-white" placeholder="Year"/>
                        </section>

                        <Label>Sex</Label>
                        <RadioGroup className="space-y-1 my-2" defaultValue="unknown">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="unknown" id="unknown" />
                                <Label htmlFor="unknown">Not specified</Label>
                            </div>
                        </RadioGroup>

                        <hr className="my-4"/>

                        <div className="items-top flex space-x-2 mt-2">
                            <Checkbox className="bg-white" id="age" />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="age"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Show age
                                </label>
                                <p className="text-sm text-muted-foreground">
                                    Allow other users to see your age.
                                </p>
                            </div>
                        </div>
                        <div className="items-top flex space-x-2 mt-4">
                            <Checkbox className="bg-white" id="birth" />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="birth"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Show date of birth
                                </label>
                                <p className="text-sm text-muted-foreground">
                                    Allow other users to see your date of birth.
                                </p>
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="pt-2">
                        <Button>Save changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password"/>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password"/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}