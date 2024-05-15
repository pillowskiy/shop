import CommentService from '@api/services/comment.service'
import { buildToast, useToast } from '@common/toast/useToast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { type FC, useState } from 'react'

import { UserAvatar } from '@components/UserAvatar'

import { Button } from '@ui/Button'
import { Textarea } from '@ui/Textarea'

import { useProfile } from '@hooks/useProfile'

import type {
	CreateCommentData,
	CreateCommentErrors
} from '@/types/comment.interface'

interface UserCommentFormProps {
	userId: number
}

const INITIAL_COMMENT: CreateCommentData = {
	rating: 0,
	text: ''
}

export const UserCommentForm: FC<UserCommentFormProps> = ({ userId }) => {
	const { profile } = useProfile()
	const [data, setData] = useState<CreateCommentData>(INITIAL_COMMENT)
	const [errors, setErrors] = useState<CreateCommentErrors>({})
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const { mutate, isLoading } = useMutation(
		['create comment', userId],
		() => {
			return CommentService.create(userId, data)
		},
		{
			onMutate: () => {
				setErrors({})
			},
			onSuccess: () => {
				toast(buildToast('comment.post.success').toast)
				return queryClient.invalidateQueries(['get comments', userId])
			},
			onError: err => {
				if (!isAxiosError(err)) return
				const errors = err.response?.data?.errors
				if (errors) {
					setErrors(errors)
				} else {
					toast(
						buildToast('error', {
							error: err.response?.data?.message || 'Unhandled error occurred.'
						}).toast
					)
				}
			},
			onSettled: () => setData(INITIAL_COMMENT)
		}
	)

	if (!profile) return null
	return (
		<form className='w-full sm:flex'>
			<UserAvatar className='hidden sm:block' src={profile.avatarURL} />

			<section className='sm:ml-4 w-full'>
				<Textarea
					className='bg-white'
					placeholder='Write something'
					value={data.text}
					onChange={({ target }) => setData({ ...data, text: target.value })}
					maxLength={420}
					required
				/>
				{errors.text && (
					<p className='text-destructive text-xs mt-1'>{errors.text}</p>
				)}
				<Button
					className='mt-2 flex'
					onClick={() => mutate()}
					disabled={isLoading}
				>
					{isLoading && <Loader2 className='w-4 h-4 mr-2' />}
					<p>Post a comment</p>
				</Button>
			</section>
		</form>
	)
}
