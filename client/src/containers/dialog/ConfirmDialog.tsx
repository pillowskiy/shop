import type {FC, PropsWithChildren} from 'react';
import type {DialogProps} from "@radix-ui/react-dialog";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@common/Dialog";
import {Button} from "@ui/Button";

interface ConfirmDialog extends DialogProps {
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
        <Dialog open={isOpen} {...props}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="h-full sm:h-fit sm:max-w-[425px] flex flex-col justify-center">
                <DialogHeader>
                    <DialogTitle className="text-2xl sm:text-md">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <section className="flex flex-col md:flex-row gap-2">
                    <Button
                        type="submit"
                        className="flex-1"
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                    <Button
                        type="button"
                        className="flex-1"
                        variant="destructive"
                        onClick={onReject}
                    >
                        Cancel
                    </Button>
                    </section>
            </DialogContent>
        </Dialog>
    );
};