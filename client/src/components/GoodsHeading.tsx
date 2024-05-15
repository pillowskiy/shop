'use client'

import { cn } from '@lib/utils'
import { ChevronRight } from 'lucide-react'
import Link, { LinkProps } from 'next/link'
import type { FC } from 'react'

import { Badge } from '@ui/Badge'

interface GoodsHeadingProps extends LinkProps {
	href: string
	badge?: string
	children: string
	className?: string
}

export const GoodsHeading: FC<GoodsHeadingProps> = ({
	href,
	children,
	badge,
	className,
	...props
}) => {
	return (
		<Link
			href={href}
			className={cn(
				'mb-2 mt-6 py-1 rounded-lg hover:bg-muted select-none',
				'transition-all w-fit hover:px-2 flex gap-1 cursor-pointer',
				className
			)}
			{...props}
		>
			<h3 className='text-xl'>{children}</h3>
			<ChevronRight className='w-5 h-5 mt-1.5' />
			{badge && (
				<Badge className='h-4 p-2' variant='secondary'>
					{badge}
				</Badge>
			)}
		</Link>
	)
}
