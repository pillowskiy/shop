export type CreatePromoCodeData = Omit<PromoCode, 'ownerId'> & {
    activationLimit?: number;
}

export interface PromoCode {
    id: number;
    name: string;
    expiresAt: Date;
    activationLimit: number;
    discountPercent: number;
    ownerId?: number;
}