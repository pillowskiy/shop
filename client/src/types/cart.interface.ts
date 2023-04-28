import  { Product } from './product.interface';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}