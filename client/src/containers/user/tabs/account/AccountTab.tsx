import type {FC} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@common/Tabs"
import {useProfile} from "@hooks/useProfile";
import {ProfileTab} from "@containers/user/tabs/account/ProfileTab";
import {createContext} from "react";
import type {User} from "@/types/user.interface";
import {ShippingTab} from "@containers/user/tabs/account/ShippingTab";
import {PrivacyTab} from "@containers/user/tabs/account/PrivacyTab";
import {BillingTab} from "@containers/user/tabs/account/BillingTab";

export const AccountContext = createContext<User | undefined>(undefined);

export const AccountTab: FC = () => {
    const {profile} = useProfile();

    return (
        <Tabs defaultValue="profile" className="w-full md:w-[500px]">
            <TabsList className="flex gap-1 w-full md:w-[500px] overflow-x-auto justify-start sm:justify-center h-fit select-none">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="black_list" disabled>Black List</TabsTrigger>
            </TabsList>
            <AccountContext.Provider value={profile}>
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
            </AccountContext.Provider>
        </Tabs>
    )
}