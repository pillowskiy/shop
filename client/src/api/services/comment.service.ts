import type {AxiosResponse} from 'axios'
import {$api} from '../api.interceptor'
import {Filter} from "@/types/review.interface";
import type {CreateCommentData, GetAllCommentsResponse} from "@/types/comment.interface";
import {CommentSort} from "@/types/comment.interface";

export default class CommentService {
    private static controller = 'comments';

    static async getById(userId: number, filterParams?: Filter): Promise<AxiosResponse<GetAllCommentsResponse>> {
        return $api.get<GetAllCommentsResponse>(`/${CommentService.controller}/${userId}`, {
            params: filterParams || {sort: CommentSort.Newest}
        });
    }

    static async create(
        userId: number,
        data: CreateCommentData
    ): Promise<AxiosResponse<Comment>> {
        return $api.post<Comment>(`/${CommentService.controller}/${userId}`, data);
    }

    static async delete(commentId: number): Promise<AxiosResponse<Comment>> {
        return $api.delete<Comment>(`/${CommentService.controller}/${commentId}`);
    }
}