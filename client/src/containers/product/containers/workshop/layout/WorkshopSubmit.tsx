import type { FC } from 'react'

import { ProductActionConfirm } from '@containers/product/containers/workshop/dialogs/ProductActionConfirm'

interface WorkshopSubmitProps {
	isProductExist: boolean
	onConfirm: () => void
}

const PRODUCT_ACTION_CONFIRM_BODY = {
	update: {
		title: 'Product updates',
		description:
			'You are sure you want to update the product data? Old data will be lost!'
	},
	create: {
		title: 'Product creation',
		description: 'Are you sure you want to create a new product?'
	}
}

export const WorkshopSubmitButton: FC<WorkshopSubmitProps> = ({
	isProductExist,
	onConfirm
}) => {
	return (
		<ProductActionConfirm
			{...PRODUCT_ACTION_CONFIRM_BODY[isProductExist ? 'update' : 'create']}
			onConfirm={onConfirm}
		>
			{isProductExist ? 'Update' : 'Create'}
		</ProductActionConfirm>
	)
}
