import type {User} from "./user.interface";
import type {Pagination, WithPaginationResponse} from "@/types/";

export enum ReviewSort {
    Newest = 'NEWEST',
    Oldest = 'OLDEST',
    Better = 'BETTER',
    Worse = 'WORSE',
}

export interface Filter extends Pagination {
    sort?: ReviewSort;
}

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

export interface GetAlLReviewsResponse extends WithPaginationResponse {
    reviews: Review[];
};

export interface ReviewStatistic {
    avg: number;
    intervalCounts: {
        percentages: number,
        intervalCounts: number,
        rate: number,
    }[]
}