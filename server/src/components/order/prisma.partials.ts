import { Prisma } from '@prisma/client';

export const orderItemSelect: Prisma.OrderItemSelect = {
  id: true,
  orderId: true,
  product: true,
  price: true,
  quantity: true,
};
