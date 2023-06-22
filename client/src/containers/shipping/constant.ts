import {CreateShippingData} from "@types/shipping.interface";

export const INITIAL_SHIPPING_DATA: Omit<CreateShippingData, 'temp'> = {
    country: "",
    state: "",
    city: "",
    surname: "",
    name: "",
    phone: "",
}