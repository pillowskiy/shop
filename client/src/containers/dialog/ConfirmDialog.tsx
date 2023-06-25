import type {FC, PropsWithChildren} from 'react';
import type {AlertDialogProps} from "@radix-ui/react-alert-dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@common/AlertDialog";

interface ConfirmDialog extends AlertDialogProps {
    title: string;
    description: string;
    onConfirm: () => void;
    onReject: () => void;
    isOpen: boolean;
}

export const ConfirmDialog: FC<PropsWithChildren<ConfirmDialog>> = ({
    children,
    title,
    description,
    onConfirm,
    onReject,
    isOpen,
    ...props
}) => {
    return (
        <AlertDialog open={isOpen} {...props}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="h-full sm:h-fit sm:max-w-[425px] flex flex-col justify-center">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl sm:text-md">{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onReject}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};