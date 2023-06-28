import {type FC, useContext} from 'react';

import {Button} from "@ui/Button";
import {Label} from "@ui/Label";
import {Checkbox} from "@ui/Checkbox";

import {Select, SelectGroup, SelectValue, SelectContent, SelectItem, SelectTrigger} from "@common/Select";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@common/Card";

import {AccountContext} from "@containers/user/UserWorkshopScreen";
import {HoverInfoCard} from "@components/HoverInfoCard";

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
            <CardContent className="md:max-h-[600px] overflow-y-auto rounded-lg">
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

                <Select defaultValue="all">
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
            <CardFooter className="pt-2">
                <HoverInfoCard
                    title="Sorry for the inconvenience"
                    description="This feature is currently under development"
                >
                    <div>
                        <Button disabled>Save changes</Button>
                    </div>
                </HoverInfoCard>
            </CardFooter>
        </Card>
    );
};