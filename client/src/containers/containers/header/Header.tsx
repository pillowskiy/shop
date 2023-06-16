import type {FC} from 'react';
import {SearchBar} from "./forms/SearchBar";
import {cn} from "@lib/utils";
import {ProfilePopover} from "@containers/user/layout/ProfilePopover";
import {useProfile} from "@hooks/useProfile";
import Image from "next/image";
import {Button} from "@ui/Button";
import Link from "next/link";

export const Header: FC = () => {
    const {profile} = useProfile();

    return (
        <header
            className={cn(
                "sticky top-0 w-full flex justify-center",
                "px-custom h-16 items-center z-20 bg-popover md:px-[64px]"
            )}
        >
            <SearchBar/>
            <section className="absolute right-0 md:mr-[48px] lg:mr-[126px] hidden md:block">
                {
                    profile ? (
                        <ProfilePopover profile={profile}>
                            <Image
                                className="w-11 h-11 object-cover object-top rounded-full border cursor-pointer select-none"
                                src={profile.avatarURL}
                                alt={profile.name}
                                width={256}
                                height={256}
                            />
                        </ProfilePopover>
                    ) : (
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                    )
                }
            </section>
        </header>
    );
};