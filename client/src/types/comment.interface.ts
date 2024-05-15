import type { WithPaginationResponse } from '@/types/'
import type { User } from '@/types/user.interface'

export enum CommentSort {
	Newest = 'NEWEST',
	Oldest = 'OLDEST'
}

export interface Comment {
	id: number
	createdAt: string
	updatedAt: string

	rating?: number
	text: string

	author: User
}

export interface CreateCommentData {
	rating?: number
	text: string
}

export type CreateCommentErrors = Partial<
	Record<keyof CreateCommentData, string>
>

export interface GetAllCommentsResponse extends WithPaginationResponse {
	comments: Comment[]
}
