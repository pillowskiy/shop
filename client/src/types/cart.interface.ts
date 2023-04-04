import  { IProduct } from './product.interface';

export interface ICartItem {
  id: number;
  product: IProduct;
  quantity: number;
  price: number;
}