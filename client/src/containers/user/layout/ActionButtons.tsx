import type {FC, HTMLAttributes} from 'react';
import {Button} from "@ui/Button";
import {MoreHorizontal} from "lucide-react";
import {UserMoreActionsPopup} from "@containers/user/layout/UserMoreActionsPopup";

interface UserActionButtons extends HTMLAttributes<HTMLDivElement> {}

export const UserActionButtons: FC<UserActionButtons> = ({...props}) => {
    return (
        <section {...props}>
            <div className="px-1 py-2 h-10 bg-muted shadow-sm rounded-lg uppercase font-bold text-center select-none">
                User
            </div>
            <Button className="w-full mt-2" disabled>Write a message</Button>
            <div className="flex gap-2 mt-2">
                <Button className="w-full" disabled>Subscribe</Button>
                <UserMoreActionsPopup>
                    <Button className="px-2">
                        <MoreHorizontal/>
                    </Button>
                </UserMoreActionsPopup>
            </div>
        </section>
    );
};