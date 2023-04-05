import { ICategory } from "@/types/category.interface";
import { IReview } from "@/types/review.interface";

export enum ProductSort {
  HighPrice = 0,
  LowPrice = 1,
  Newest = 2,
  Oldest = 3,
}

export interface IProduct {
  id: number;
  slug: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  quantity: number;
}

export interface IFilter {
  sort?: ProductSort;
  term?: string;
  page?: string | number;
  perPage?: string | number;
}

export interface IUpdateProductData {
  name: string;
  description?: string;
  price?: number;
  images: string[];
  categoryId: number;
}

export interface IProductFullest extends IProduct {
  category: ICategory;
  reviews: IReview[];
}