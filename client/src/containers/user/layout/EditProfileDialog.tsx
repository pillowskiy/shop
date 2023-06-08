import type {FC, PropsWithChildren} from 'react';
import {Dialog, DialogTrigger} from "@radix-ui/react-dialog";
import {DialogContent} from "@common/Dialog";
import {AccountTab} from "@containers/user/tabs/account/AccountTab";

export const EditProfileDialog: FC<PropsWithChildren> = ({children}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="p-0 border-0 bg-transparent shadow-none flex items-center justify-center">
                <AccountTab />
            </DialogContent>
        </Dialog>
    );
};