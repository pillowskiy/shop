import {Product} from "@types/product.interface";

export interface CartItem {
  productId: number;
  count: number
}

export interface CartFullestItem extends  CartItem {
  product: Product;
}

export interface CartInitialState {
  items: CartItem[];
}