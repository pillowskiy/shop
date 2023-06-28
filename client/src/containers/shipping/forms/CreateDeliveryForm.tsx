import type {FC} from 'react';
import type {CreateShippingData} from "@/types/shipping.interface";
import {FormInput, FormInputProps} from "@components/FormInput";
import {PhoneInput} from "@components/PhoneInput";
import {HoverInfoCard} from "@components/HoverInfoCard";
import {DeliveryAddressForm} from "@containers/shipping/forms/DeliveryAddressForm";
import {useProfile} from "@hooks/useProfile";

interface CreateDeliveryFormProps {
    data: CreateShippingData;
    setData: (newData: CreateShippingData) => void;
    errors: Partial<Record<keyof CreateShippingData, string>>;
}

/*
 * There is a problem with the drilling properties in this component
 */
export const CreateDeliveryForm: FC<CreateDeliveryFormProps> = ({data, setData, errors}) => {
    const {profile} = useProfile();

    const formInputProps = (value: keyof CreateShippingData): FormInputProps => {
        return {
            value: data[value]?.toString(),
            onChange: ({target}) => setData({...data, [value]: target.value}),
            error: errors[value],
        }
    }

    return (
        <div>
            <section className="flex gap-4">
                <FormInput className="bg-white" label="Name" {...formInputProps("name")}/>
                <FormInput className="bg-white" label="Surname" {...formInputProps("surname")}/>
            </section>
            <section>
                <PhoneInput className="mt-4" value={data.phone} onChange={(phone) => setData({...data, phone})}/>
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
            </section>

            <HoverInfoCard
                title="Email Address"
                description="Only the email address associated with the profile is allowed."
            >
                <div>
                    <FormInput className="bg-white" label="Email" value={profile?.email} disabled/>
                </div>
            </HoverInfoCard>

            <hr className="my-4"/>
            <DeliveryAddressForm data={data} updateData={(values) => setData({...data, ...values})}/>
        </div>
    );
};