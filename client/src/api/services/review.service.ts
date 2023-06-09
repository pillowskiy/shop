import type { AxiosResponse } from 'axios'
import type {Pagination} from "@/types";
import { $api } from '../api.interceptor'
import type {
  Review,
  ReviewCreateResponse,
  ReviewCreate,
  GetAlLReviewsResponse,
} from '@/types/review.interface'

export default class ReviewService {
  private static controller = 'reviews';

  static async getById(productId: number, filterParams?: Pagination): Promise<AxiosResponse<GetAlLReviewsResponse>> {
    return $api.get<Review[]>(`/${ReviewService.controller}/${productId}`, {params: filterParams || {}});
  }
  static async getAvg(productId: number): Promise<AxiosResponse<number>> {
    return $api.get<number>(`/${ReviewService.controller}/avg/${productId}`);
  }
  static async create(
    productId: number,
    data: ReviewCreate
  ): Promise<AxiosResponse<ReviewCreateResponse>> {
    return $api.post<ReviewCreateResponse>(`/${ReviewService.controller}/${productId}`, data);
  }
}