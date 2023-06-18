export interface Shipping {
    id: number;
    createdAt: string;

    name: string;
    surname: string;

    country: string;
    state: string;
    city: string;

    phone: string;

    userId: number;

    temp: boolean | null;
}

export type CreateShippingData = Omit<Shipping, 'id' | 'createdAt' | 'userId'>;