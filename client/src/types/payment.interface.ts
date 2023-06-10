export enum PaymentType {
    VISA = "VISA",
    PAY_PAL = "PAY_PAL",
    MAGIC = "MAGIC",
}

export interface Payment {
    createdAt: string;
    id: number;

    type: PaymentType;

    cardNumber: string;
    cardExpiresAt: Date;
}

export type CreatePaymentData = Omit<Payment, 'id' | 'createdAt'> & {
    cardCvv: string;
};