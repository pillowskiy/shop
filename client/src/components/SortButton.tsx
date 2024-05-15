'use client'

import { cn } from '@lib/utils'
import type { FC } from 'react'

import { Button, ButtonProps } from '@ui/Button'

interface SortButtonProps extends ButtonProps {
	value: string
	onValueChange: (newValue: string) => void
	children: string
}

export const SortButton: FC<SortButtonProps> = ({
	value,
	children,
	className,
	onValueChange,
	...props
}) => {
	return (
		<Button
			className={cn(className, 'h-8')}
			onClick={() => onValueChange(value)}
			{...props}
		>
			{children}
		</Button>
	)
}
