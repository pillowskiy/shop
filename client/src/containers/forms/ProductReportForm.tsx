import type {FC, PropsWithChildren} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@common/dialog";
import {Button} from "@ui/Button";
import {Textarea} from "@ui/Textarea";
import {FormCheckbox} from "@components/FormCheckbox";

export const ProductReportForm: FC<PropsWithChildren> = ({children}) => {
    return (
        <Dialog className="backdrop-blur-sm bg-foreground">
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="h-full sm:h-fit sm:max-w-[425px] flex flex-col justify-center">
                <DialogHeader>
                    <DialogTitle className="text-2xl sm:text-md">Report a review</DialogTitle>
                    <DialogDescription>
                        Ensuring honest and accurate feedback.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 mt-4">
                    <FormCheckbox className="text-sm text-foreground leading-none">Foul language, insults or aggression</FormCheckbox>
                    <FormCheckbox className="text-sm text-foreground leading-none">Open advertising (spam)</FormCheckbox>
                    <FormCheckbox className="text-sm text-foreground leading-none">Links to illegal sites and programs</FormCheckbox>
                    <FormCheckbox className="text-sm text-foreground leading-none">Not relevant to the topic under discussion</FormCheckbox>
                    <FormCheckbox className="text-sm text-foreground leading-none">Another reason</FormCheckbox>

                    <Textarea
                        className="mt-2 h-[200px] md:h-auto"
                        placeholder="Commentary."
                        maxLength={1024}
                        required
                    />
                    <Button type="submit">Send a Report</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}