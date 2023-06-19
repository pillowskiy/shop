import type {FC} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@common/Tabs"
import {ProfileTab} from "@containers/user/cards/workshop/ProfileTab";
import {ShippingTab} from "@containers/user/cards/workshop/ShippingTab";
import {PrivacyTab} from "@containers/user/cards/workshop/PrivacyTab";
import {BillingTab} from "@containers/user/cards/workshop/BillingTab";
import {useRouter} from "next/router";
import {getStringFromQuery} from "@lib/utils";

export const ProfileWorkshopTab: FC = () => {
    const router = useRouter();

    return (
        <Tabs
            className="mt-2 w-full md:w-[600px]"
            defaultValue={getStringFromQuery(router.query.tab) || "profile"}
        >
            <TabsList
                className="flex gap-1 overflow-x-auto justify-between h-fit select-none [&>*]:flex-1">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
                <ProfileTab/>
            </TabsContent>
            <TabsContent value="shipping">
                <ShippingTab/>
            </TabsContent>
            <TabsContent value="privacy">
                <PrivacyTab/>
            </TabsContent>
            <TabsContent value="billing">
                <BillingTab/>
            </TabsContent>
        </Tabs>
    )
}