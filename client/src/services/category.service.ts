import type { AxiosResponse } from 'axios'
import { $api } from '../api/api.interceptor'
import { ICategory, ICategoryUpdate } from '@/types/category.interface'

export default class CategoryService {
  private static controller = 'categories';

  static async getAll(): Promise<AxiosResponse<ICategory[]>> {
    return $api.get<ICategory[]>(`/${CategoryService.controller}`);
  }
  static async getByValue<T extends keyof Pick<ICategory, 'id' | 'slug'>>(
    type: T,
    value: ICategory[T]
  ): Promise<AxiosResponse<ICategory>> {
    return $api.get<ICategory>(`/${CategoryService.controller}/${type}/${value}`);
  }
  static async create(): Promise<AxiosResponse<ICategory>> {
    return $api.post<ICategory>(`/${CategoryService.controller}/create`);
  }
  static async delete(categoryId: number): Promise<AxiosResponse<ICategory>> {
    return $api.delete<ICategory>(`/${CategoryService.controller}/${categoryId}`);
  }
  static async update(
    categoryId: number,
    data: ICategoryUpdate
  ): Promise<AxiosResponse<ICategory>> {
    return $api.patch<ICategory>(`/${CategoryService.controller}/${categoryId}`, {
      data
    });
  }
}