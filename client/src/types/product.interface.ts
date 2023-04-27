import type { Category } from './category.interface';
import type { Review } from './review.interface';

export enum ProductSort {
  HighPrice = 0,
  LowPrice = 1,
  Newest = 2,
  Oldest = 3,
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  quantity: number;
}

export interface Filter {
  sort?: ProductSort;
  term?: string;
  page?: string | number;
  perPage?: string | number;
}

export interface UpdateProductData {
  name: string;
  description?: string;
  price?: number;
  images: string[];
  categoryId: number;
}

export interface ProductFullest extends Product {
  category: Category;
  reviews: Review[];
}