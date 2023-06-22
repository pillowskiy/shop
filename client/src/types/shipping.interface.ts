export interface Shipping extends CreateShippingData {
    id: number;
    createdAt: string;
    userId: number;
}

export interface CreateShippingData {
    name: string;
    surname: string;

    country: string;
    state: string;
    city?: string;

    phone: string;
    temp?: boolean;
}