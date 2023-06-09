import type {Dispatch, FC, SetStateAction} from 'react';
import type {PromoCode} from "@/types/promo-code.interface";
import {Card} from "@common/Card";
import {FormInput} from "@components/FormInput";
import {Button} from "@ui/Button";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import PromoCodeService from "@api/services/promo-code.service";
import {useToast} from "@common/toast/useToast";
import {isAxiosError} from "axios";
import {Loader2} from "lucide-react";

interface OrderPromoCodeCard {
    promo: PromoCode;
    setPromo: Dispatch<SetStateAction<PromoCode | null>>;
}

export const OrderPromoCodeCard: FC<OrderPromoCodeCard> = ({promo, setPromo}) => {
    const [error, setError] = useState("");
    const [value, setValue] = useState("");
    const {toast} = useToast();

    const {mutate, isLoading} = useMutation(['find promo', value], () => {
        return PromoCodeService.findOne(value);
    }, {
        onError: (err) => {
            if (isAxiosError(err)) {
                setError(err.response.data.message || "Unhandled error occurred (promo)");
            }
        },
        onSuccess: ({data}) => {
            toast({
                description: `✅ You have successfully applied promo-code: ${data.name}`
            });
            setPromo(data);
        },
        onSettled: () => {
            setValue("");
        },
    });

    return (
        <Card className="bg-popover px-4 pb-4">
            <FormInput
                className="bg-white"
                label="Promo-code"
                value={value || promo?.name || ""}
                onChange={({target}) => setValue(target.value.toUpperCase())}
                error={error}
                placeholder="SUMMER2023"
                disabled={!!promo}
            />
            <Button
                className="mt-2 w-full flex"
                disabled={isLoading || !!promo}
                onClick={() => {
                    if (!value) return;
                    mutate();
                }}
            >
                {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin"/>}
                <p>Apply</p>
            </Button>
        </Card>
    );
};