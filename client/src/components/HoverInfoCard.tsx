'use client'

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger
} from '@common/HoverCard'
import { cn } from '@lib/utils'
import type { HoverCardProps } from '@radix-ui/react-hover-card'
import type { FC, PropsWithChildren } from 'react'

interface HoverInfoCardProps extends HoverCardProps {
	title?: string
	description: string
	disabled?: boolean
}

export const HoverInfoCard: FC<PropsWithChildren<HoverInfoCardProps>> = ({
	description,
	title,
	children,
	disabled,
	...props
}) => {
	return (
		<HoverCard openDelay={100} closeDelay={300} {...props}>
			<HoverCardTrigger asChild>{children}</HoverCardTrigger>
			<HoverCardContent className={cn('w-80', disabled && 'hidden')}>
				<h5 className='text-sm font-semibold'>{title}</h5>
				<span className='text-sm text-muted-foreground leading-none'>
					{description}
				</span>
			</HoverCardContent>
		</HoverCard>
	)
}
