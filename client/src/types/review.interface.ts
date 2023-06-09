import { User } from "./user.interface";
import {WithPaginationResponse} from "@types/index";

export type ReviewCreateResponse = Review & { user: User };
export type ReviewCreate = Pick<Review, 'text' | 'rating'>;
export type ReviewHelpful = Pick<User, 'id' | 'name'>;

export interface Review {
  id: number;
  user?: User;
  text: string;
  rating: number;
  helpful: ReviewHelpful[];
  createdAt: string;
};

export type ReviewErrors = Record<keyof ReviewCreate, string>;

export type GetAlLReviewsResponse = WithPaginationResponse<"reviews", Review[]>;