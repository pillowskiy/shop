import { Prisma } from '@prisma/client';

export const paymentSelect: Prisma.PaymentSelect = {
  id: true,
  createdAt: true,
  cardNumber: true,
  cardExpiresAt: true,
  cardCvv: false,
  type: true,
};
