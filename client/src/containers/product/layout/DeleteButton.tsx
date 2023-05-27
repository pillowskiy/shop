import type {FC} from 'react';
import {Trash2} from "lucide-react";
import {Button, type ButtonProps} from "@ui/Button";
import {ConfirmDialog} from "@containers/dialog/ConfirmDialog";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/router";
import ProductService from "@api/services/product.service";

interface DeleteButtonProps extends ButtonProps {
    children?: string;
    productId: number;
}

export const DeleteButton: FC<DeleteButtonProps> = ({children, productId, ...props}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();

    const {mutate} = useMutation(['delete product', productId], () => {
        return ProductService.delete(productId);
    }, {
        onSuccess: () => router.push('/'),
    });

    return (
        <ConfirmDialog
            title="Deleting a product"
            description="Are you sure you want to delete the product?"
            onConfirm={mutate}
            onReject={() => setIsDialogOpen(false)}
            isOpen={isDialogOpen}
        >
            <Button {...props} onClick={() => setIsDialogOpen(true)}>
                <Trash2/>
                {children && <p className="ml-1">{children}</p>}
            </Button>
        </ConfirmDialog>
    );
};