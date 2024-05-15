import { FC, useState } from 'react'

import { ConfirmDialog } from '@containers/dialog/ConfirmDialog'

import { Button } from '@ui/Button'

interface ProductActionConfirmProps {
	title: string
	description: string
	onConfirm: () => void
	children: string
}

export const ProductActionConfirm: FC<ProductActionConfirmProps> = ({
	title,
	description,
	onConfirm,
	children
}) => {
	const [dialogIsOpen, setDialogIsOpen] = useState(false)
	return (
		<ConfirmDialog
			title={title}
			description={description}
			onConfirm={() => {
				onConfirm()
				setDialogIsOpen(false)
			}}
			onReject={() => setDialogIsOpen(false)}
			isOpen={dialogIsOpen}
		>
			<Button onClick={() => setDialogIsOpen(true)}>{children}</Button>
		</ConfirmDialog>
	)
}
