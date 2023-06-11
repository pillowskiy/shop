import type {FC} from 'react';
import {DE, FR, GB, PL, UA} from "country-flag-icons/react/1x1";
import {CardDescription} from "@common/Card";
import {Combobox} from "@components/Combobox";
import {Country, State, City} from "country-state-city";
import {useState} from "react";

interface AddressValue {
    value: string;
    label: string;
}

interface AddressState {
    country: string | null;
    state: string | null;
    city: string | null;
}

export const DeliveryAddressForm: FC = () => {
    const [address, setAddress] = useState<AddressState>({country: null, state: null, city: null});

    const updateAddress = (value: Record<keyof AddressState, string>) => {
        setAddress({...address, ...value})
    }

    const countries = Country.getAllCountries();
    const updatedCountries: AddressValue[] = countries.map(country => ({
        label: country.name,
        value: country.isoCode,
    }));

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

    console.log(address);

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
                onValueChange={(value) => updateAddress({country: value})}
            />
            <Combobox
                items={getState(address.country)}
                placeholder="Select state"
                onValueChange={(value) => updateAddress({ state: value })}
                disabled={!address.country}
            />
            <Combobox
                items={getCity(address.country, address.state)}
                placeholder="Select city"
                onValueChange={(value) => updateAddress({ city: value })}
                disabled={!address.state}
            />

            <CardDescription className="mt-1 text-xs">
                Make sure your city is in a supported country
            </CardDescription>
        </form>
    );
};