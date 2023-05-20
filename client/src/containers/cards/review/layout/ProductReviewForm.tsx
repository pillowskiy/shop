import type {FC} from 'react';
import {Textarea} from "@ui/Textarea";
import {Button} from "@ui/Button";
import {Send} from "lucide-react";

export const ProductReviewForm: FC = () => {
    return (
        <form className="pb-4 border-b" action="">
            <h2 className="text-xl md:text-2xl font-medium mt-2">Review this product</h2>
            <p className="text-primary opacity-90">Share your thoughts with other customers</p>
            <Textarea className="mt-4 bg-white" placeholder="Start entering comments here." maxLength={1024} />
            <Button type="submit" className="mt-2 w-full">
                <p>Send</p>
                <Send className="font-normal w-4 h-4 ml-1" />
            </Button>
        </form>
    );
};