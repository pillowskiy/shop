import type {FC} from 'react';
import type {User} from "@/types/user.interface";

import {
    CreditCard,
    List,
    Mails,
    LifeBuoy,
    LogOut,
    Gift,
    Truck,
    Send,
    User as UserIcon,
    Package,
    Plus
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@common/DropdownMenu";

import Image from "next/image";
import {useAppDispatch} from "@redux/store";
import {logout as logoutAction} from "@redux/user/user.actions";
import Link from "next/link";
import {useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/router";

interface ProfilePopoverProps {
    profile: User;
}

export const ProfilePopover: FC<ProfilePopoverProps> = ({profile}) => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const router = useRouter();

    const logout = () => {
        dispatch(logoutAction()).finally(() => {
            queryClient.removeQueries(['get profile']);
            return router.reload();
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <li
                    className="cursor-pointer p-2 rounded-lg text-center w-1/5 md:w-10/12 mt-auto"
                >
                    <Image
                        className="w-7 h-7 md:w-12 md:h-12 object-cover m-auto rounded-full"
                        src={profile.avatarURL}
                        alt={profile.name}
                        width={64}
                        height={64}
                    />
                    <p className="text-xs block md:hidden">{profile.name}</p>
                </li>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{profile.name}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link className="flex items-center" href={`/users/${profile.id}`}>
                            <UserIcon className="mr-2 h-4 w-4"/>
                            <span>Your Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <List className="mr-2 h-4 w-4"/>
                        <span>Your Orders</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem disabled>
                        <Send className="mr-2 h-4 w-4"/>
                        <span>Correspondences</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <Mails className="mr-2 h-4 w-4"/>
                        <span>Mailings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <Gift className="mr-2 h-4 w-4"/>
                        <span>Gifts</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem disabled>
                    <Truck className="mr-2 h-4 w-4"/>
                    <span>Delivery</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4"/>
                    <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4"/>
                    <span>Support</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link className="flex items-center" href={'/products/workshop/@me'}>
                            <Plus className="mr-2 h-4 w-4"/>
                            <span>Create Product</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link className="flex items-center" href={`/products/users/${profile.id}`}>
                            <Package className="mr-2 h-4 w-4"/>
                            <span>Your Products</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}