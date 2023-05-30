import type { AxiosResponse } from 'axios'
import { $api } from '../api.interceptor'
import type {
  User,
  UserUpdate
} from '@/types/user.interface'

export default class UserService {
  private static controller = 'users';

  static async getProfile(): Promise<AxiosResponse<User>> {
    return $api.get<User>(`/${UserService.controller}/profile`);
  }
  static async getById(userId: number): Promise<AxiosResponse<User>> {
    return $api.get<User>(`/${UserService.controller}/profile/${userId}`);
  }
  static async toggleFavorite(productId: number): Promise<AxiosResponse<User>> {
    return $api.patch<User>(
      `/${UserService.controller}/profile/products/favorite/${productId}`
    );
  }
  static async toggleHelpful(reviewId: number): Promise<AxiosResponse<User>> {
    return $api.patch<User>(
        `/${UserService.controller}/profile/reviews/helpful/${reviewId}`
    );
  }
  static async update(data: UserUpdate): Promise<AxiosResponse<User>> {
    return $api.patch<User>(`/${UserService.controller}/profile`, {
      data
    });
  }
}