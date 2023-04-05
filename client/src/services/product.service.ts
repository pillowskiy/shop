import type { AxiosResponse } from 'axios'
import { $api } from '../api/api.interceptor'
import type {
  IFilter,
  IProduct,
  IProductFullest,
  IUpdateProductData,
} from '../types/product.interface';

export default class ProductService {
  private static controller = 'products';

  static async getAll(filterParams?: IFilter)
    : Promise<AxiosResponse<IProduct[]>> {
    return $api.get<IProduct[]>(`${this.controller}`, { params: filterParams || {} });
  }

  static async getByValue<T extends keyof Pick<IProduct, 'id' | 'slug'>>(
    type: T,
    value: IProduct[T]
  ): Promise<AxiosResponse<IProduct>> {
    return $api.get<IProduct>(`${this.controller}/${type}/${value}`);
  }

  static async getByCategorySlug(slug: string): Promise<AxiosResponse<IProduct>> {
    return $api.get<IProduct>(`${this.controller}/category/${slug}`);
  }

  static async getSimilar(productId: number): Promise<AxiosResponse<IProduct[]>> {
    return $api.get<IProduct[]>(`${this.controller}/similar/${productId}`);
  }

  static async create(): Promise<AxiosResponse<number>> {
    return $api.post<number>(`${this.controller}`);
  }

  static async update(
    productId: number,
    data: IUpdateProductData
  ): Promise<AxiosResponse<IProductFullest>> {
    return $api.put<IProductFullest>(`${this.controller}/${productId}`, data);
  }

  static async delete(productId: number): Promise<AxiosResponse<number>> {
    return $api.delete<number>(`${this.controller}/${productId}`);
  }
}