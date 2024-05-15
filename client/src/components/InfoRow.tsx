'use client'

import { cn } from '@lib/utils'
import type { FC, HTMLAttributes } from 'react'

interface InfoRowProps extends HTMLAttributes<HTMLDivElement> {
	title: string
	children: string | number
}

export const InfoRow: FC<InfoRowProps> = ({
	title,
	children,
	className,
	...props
}) => {
	return (
		<div className={cn('flex justify-between', className)} {...props}>
			<p className='font-medium'>{title}:</p>
			<p className='text-primary opacity-90 ml-50'>{children}</p>
		</div>
	)
}
