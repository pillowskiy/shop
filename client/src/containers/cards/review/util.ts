import type {Review} from "@/types/review.interface";

export const analyzeReviews = (reviews: Review[]) => {
    let intervalCounts: number[] = [0, 0, 0, 0, 0];
    let totalCount: number = reviews.length;
    for (let i = 0; i < totalCount; i++) {
        let reviewRate = reviews[i].rating;
        intervalCounts[Math.floor(reviewRate) - 1]++;
    }
    return intervalCounts.map(count => {
        return {
            percentages: (count / totalCount) * 100 || 0,
            intervalCounts: count
        };
    });
}