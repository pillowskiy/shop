import type {FC} from 'react';
import type {CreateShippingData} from "@/types/shipping.interface";
import {DE, FR, GB, PL, UA} from "country-flag-icons/react/1x1";
import {CardDescription} from "@common/Card";
import {Combobox} from "@components/Combobox";
import {Country, State, City} from "country-state-city";

interface AddressValue {
    value: string;
    label: string;
}

interface DeliveryAddressFormProps {
    data: CreateShippingData;
    updateData: (values: Partial<CreateShippingData>) => void;
}

const getState = (countryCode: string | null): AddressValue[] => {
    if (!countryCode) return [];
    return State.getStatesOfCountry(countryCode).map(state => ({
        label: state.name,
        value: state.isoCode,
    }));
}

const getCity = (countryCode: string | null, stateCode: string | null): AddressValue[] => {
    if (!countryCode || !stateCode) return [];
    return City.getCitiesOfState(countryCode, stateCode).map(city => ({
        label: city.name,
        value: city.name,
    }));
}

export const DeliveryAddressForm: FC<DeliveryAddressFormProps> = ({data, updateData}) => {
    const countries = Country.getAllCountries();
    const updatedCountries: AddressValue[] = countries.map(country => ({
        label: country.name,
        value: country.isoCode,
    }));

    return (
        <form className="border rounded-lg p-2 bg-white">
            <p className="font-consolas text-sm text-primary opacity-90 text-center">Popular countries</p>
            <div className="flex shrink mt-2 gap-4 justify-center">
                <UA className="w-8 h-8 object-cover rounded-full border md:hover:scale-[1.05] hover:border-green-400 transition-all cursor-pointer"/>
                <DE className="w-8 h-8 object-cover rounded-full border md:hover:scale-[1.05] hover:border-green-400 transition-all cursor-pointer"/>
                <FR className="w-8 h-8 object-cover rounded-full border md:hover:scale-[1.05] hover:border-green-400 transition-all cursor-pointer"/>
                <PL className="w-8 h-8 object-cover rounded-full border md:hover:scale-[1.05] hover:border-green-400 transition-all cursor-pointer"/>
                <GB className="w-8 h-8 object-cover rounded-full border md:hover:scale-[1.05] hover:border-green-400 transition-all cursor-pointer"/>
            </div>

            <Combobox
                items={updatedCountries}
                placeholder="Select country"
                onValueChange={(value) => updateData({country: value})}
            />
            <Combobox
                items={getState(data.country)}
                placeholder="Select state"
                onValueChange={(value) => updateData({ state: value })}
                disabled={!data.country}
            />
            <Combobox
                items={getCity(data.country, data.state)}
                placeholder="Select city"
                onValueChange={(value) => updateData({ city: value })}
                disabled={!data.state}
            />

            <CardDescription className="mt-1 text-xs">
                Make sure your city is in a supported country
            </CardDescription>
        </form>
    );
};