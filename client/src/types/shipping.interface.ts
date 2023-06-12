export interface Shipping {
    id: number;
    createdAt: string;

    name: string;
    surname: string;

    country: string;
    state: string;
    city: string;

    userId: number;
}

export type CreateShippingData = Omit<Shipping, 'id' | 'createdAt' | 'userId'>;