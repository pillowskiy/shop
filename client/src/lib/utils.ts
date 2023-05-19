import {ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {isAxiosError} from "axios";
import {Review} from "@types/review.interface";
 
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const rejectAxios = (err: unknown) => {
  if (isAxiosError(err) && err.response) {
    return err.response.data;
  }
  throw err;
}

export const getFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
}

export const getSlugFromQuery = (slug: string | string[] | undefined) => {
  return typeof slug === "string" ? slug : Array.isArray(slug) ? slug[0] : "";
}

export const analyzeReviews = (reviews: Review[]) => {
  let intervalCounts: number[] = [0, 0, 0, 0, 0];
  let totalCount: number = reviews.length;
  for (let i = 0; i < totalCount; i++) {
    let reviewRate = reviews[i].rating;
    intervalCounts[Math.floor(reviewRate) - 1]++;
  }
  return intervalCounts.map(count => {
    return {
      percentages: (count / totalCount) * 100,
      intervalCounts: count
    };
  });
}