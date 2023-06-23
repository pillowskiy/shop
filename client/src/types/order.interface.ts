import type {CartItem} from './cart.interface';
import type {Product} from "@/types/product.interface";
import type {Payment} from "@/types/payment.interface";
import type {Shipping} from "@/types/shipping.interface";
import type {PromoCode} from "@/types/promo-code.interface";

export enum OrderStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export interface Order {
    id: number;
    createdAt: string;
    updatedAt: string;

    payment?: Payment;
    items: OrderItem[];
    shipping: Shipping;
    promoCode?: PromoCode;

    status: OrderStatus;
    userId: number;
}

interface OrderItem {
    id: number,
    orderId: number,
    product: Product,
    price: number,
    quantity: number,
}

export interface CreateOrderData {
    items: CreateOrderItem[];
    shippingId: number;
    paymentId?: number;
    promoId?: number;
}

export type OrderDetailsValues = Pick<CreateOrderData, 'paymentId' | 'shippingId'>;

export interface CheckoutOrderContext extends CreateOrderData {
    updateDetails: (values: Partial<OrderDetailsValues>) => void;
    setItems: (values: CreateOrderItem[]) => void
}

export interface CreateOrderItem {
    productId: number;
    quantity: number;
}

export interface OrderItem {
    id: number;
    orderId: number;
    price: number;
    product: Product;
    quantity: number;
}