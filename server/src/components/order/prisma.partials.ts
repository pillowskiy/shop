import { Prisma } from '@prisma/client';
import { paymentSelect } from '../payment/prisma.partials';
import { productSelect } from '../product/prisma.partials';

export const orderItemSelect: Prisma.OrderItemSelect = {
  id: true,
  orderId: true,
  product: {
    select: productSelect,
  },
  price: true,
  quantity: true,
};

export const orderSelect: Prisma.OrderSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,

  payment: {
    select: paymentSelect,
  },
  items: {
    select: orderItemSelect,
  },
  shipping: true,
  promoCode: true,

  status: true,
  userId: true,
};
