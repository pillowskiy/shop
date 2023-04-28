import type { AxiosResponse } from 'axios'
import { $api } from '../api.interceptor'
import { Category, CategoryUpdate } from '@/types/category.interface'

export default class CategoryService {
  private static controller = 'categories';

  static async getAll(): Promise<AxiosResponse<Category[]>> {
    return $api.get<Category[]>(`/${CategoryService.controller}`);
  }
  static async getByValue<T extends keyof Pick<Category, 'id' | 'slug'>>(
    type: T,
    value: Category[T]
  ): Promise<AxiosResponse<Category>> {
    return $api.get<Category>(`/${CategoryService.controller}/${type}/${value}`);
  }
  static async create(): Promise<AxiosResponse<Category>> {
    return $api.post<Category>(`/${CategoryService.controller}/create`);
  }
  static async delete(categoryId: number): Promise<AxiosResponse<Category>> {
    return $api.delete<Category>(`/${CategoryService.controller}/${categoryId}`);
  }
  static async update(
    categoryId: number,
    data: CategoryUpdate
  ): Promise<AxiosResponse<Category>> {
    return $api.patch<Category>(`/${CategoryService.controller}/${categoryId}`, data);
  }
}