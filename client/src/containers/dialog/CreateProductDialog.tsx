import type {FC, PropsWithChildren} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@common/Dialog";
import {Button} from "@ui/Button";
import {DialogClose} from "@radix-ui/react-dialog";

export const CreateProductDialog: FC<PropsWithChildren> = ({children}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="h-full sm:h-fit sm:max-w-[425px] flex flex-col justify-center">
                <DialogHeader>
                    <DialogTitle className="text-2xl sm:text-md">Create a product</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to create a new product?
                    </DialogDescription>
                </DialogHeader>
                <form>
                    <section className="flex flex-col md:flex-row gap-2">
                        <Button type="submit" className="flex-1">
                            Yes, I am sure
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" className="flex-1" variant="destructive">
                                Cancel
                            </Button>
                        </DialogClose>
                    </section>
                </form>
            </DialogContent>
        </Dialog>
    );
};