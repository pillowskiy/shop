import type { AxiosResponse } from 'axios'
import { $api } from '../api.interceptor'
import type {
  Review,
  ReviewCreateResponse,
  ReviewCreate
} from '@/types/review.interface'

export default class ReviewService {
  private static controller = 'reviews';

  static async getById(productId: number): Promise<AxiosResponse<Review[]>> {
    return $api.get<Review[]>(`/${ReviewService.controller}/${productId}`);
  }
  static async getAvg(productId: number): Promise<AxiosResponse<number>> {
    return $api.get<number>(`/${ReviewService.controller}/avg/${productId}`);
  }
  static async create(
    categoryId: number,
    data: ReviewCreate
  ): Promise<AxiosResponse<ReviewCreateResponse>> {
    return $api.post<ReviewCreateResponse>(`/${ReviewService.controller}/${categoryId}`, {
      data
    });
  }
}