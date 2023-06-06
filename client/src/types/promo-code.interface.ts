export interface CreatePromoCodeData extends Omit<PromoCode, { 'ownerId': number }> {
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