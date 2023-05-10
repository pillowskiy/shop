import type { AxiosResponse } from 'axios'
import { $api } from '../api.interceptor'
import type {
  Filter,
  Product,
  ProductFullest,
  UpdateProductData,
  GetAllProductsResponse,
} from '@/types/product.interface';

export default class ProductService {
  private static controller = 'products';

  static async getAll(filterParams?: Filter)
    : Promise<AxiosResponse<GetAllProductsResponse>> {
    return $api.get<GetAllProductsResponse>(`${this.controller}`, { params: filterParams || {} });
  }

  static async getByValue<T extends keyof Pick<Product, 'id' | 'slug'>>(
    type: T,
    value: Product[T]
  ): Promise<AxiosResponse<Product>> {
    return $api.get<Product>(`${this.controller}/${type}/${value}`);
  }

  static async getByCategorySlug(slug: string): Promise<AxiosResponse<Product>> {
    return $api.get<Product>(`${this.controller}/category/${slug}`);
  }

  static async getSimilar(productId: number): Promise<AxiosResponse<Product[]>> {
    return $api.get<Product[]>(`${this.controller}/similar/${productId}`);
  }

  static async create(): Promise<AxiosResponse<number>> {
    return $api.post<number>(`${this.controller}`);
  }

  static async update(
    productId: number,
    data: UpdateProductData
  ): Promise<AxiosResponse<ProductFullest>> {
    return $api.put<ProductFullest>(`${this.controller}/${productId}`, data);
  }

  static async delete(productId: number): Promise<AxiosResponse<number>> {
    return $api.delete<number>(`${this.controller}/${productId}`);
  }
}