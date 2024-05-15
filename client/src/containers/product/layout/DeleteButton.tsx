import ProductService from '@api/services/product.service'
import { Routes } from '@config'
import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/router'
import { type FC, useState } from 'react'

import { ConfirmDialog } from '@containers/dialog/ConfirmDialog'

import { Button, type ButtonProps } from '@ui/Button'

interface DeleteButtonProps extends ButtonProps {
	children?: string
	productId: number
}

export const DeleteButton: FC<DeleteButtonProps> = ({
	children,
	productId,
	...props
}) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const router = useRouter()

	const { mutate } = useMutation(
		['delete product', productId],
		() => {
			return ProductService.delete(productId)
		},
		{
			onSuccess: () => router.push(Routes.Home)
		}
	)

	return (
		<ConfirmDialog
			title='Deleting a product'
			description='Are you sure you want to delete the product?'
			onConfirm={mutate}
			onReject={() => setIsDialogOpen(false)}
			isOpen={isDialogOpen}
		>
			<Button {...props} onClick={() => setIsDialogOpen(true)}>
				<Trash2 /> {children || null}
			</Button>
		</ConfirmDialog>
	)
}
