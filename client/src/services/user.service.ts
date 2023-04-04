import type { AxiosResponse } from 'axios'
import { $api } from '../api/api.interceptor'
import type {
  IUser,
  FullestUser,
  UserUpdate
} from '@/types/user.interface'

export default class UserService {
  private static controller = 'users';

  static async getById(userId: number): Promise<AxiosResponse<FullestUser>> {
    return $api.get<FullestUser>(`/${UserService.controller}/${userId}`);
  }
  static async toggleFavorite(productId: number): Promise<AxiosResponse<FullestUser>> {
    return $api.patch<FullestUser>(
      `/${UserService.controller}/profile/products/favorite/${productId}`
    );
  }
  static async update(
    categoryId: number,
    data: UserUpdate
  ): Promise<AxiosResponse<IUser>> {
    return $api.patch<IUser>(`/${UserService.controller}/${categoryId}`, {
      data
    });
  }
}