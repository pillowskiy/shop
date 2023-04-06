import type { AxiosResponse } from 'axios'
import { $api } from '../api/api.interceptor'
import type {
  IReview,
  ReviewCreateResponse,
  ReviewCreate
} from '@/types/review.interface'

export default class ReviewService {
  private static controller = 'reviews';

  static async getById(productId: number): Promise<AxiosResponse<IReview[]>> {
    return $api.get<IReview[]>(`/${ReviewService.controller}/${productId}`);
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