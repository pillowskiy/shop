import { cn } from '@lib/utils'
import Link from 'next/link'
import type { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react'

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string
}

export const Anchor: FC<PropsWithChildren<AnchorProps>> = ({
	children,
	className,
	...props
}) => {
	return (
		<Link
			className={cn(
				'cursor-pointer text-primary transition-all',
				'hover:underline hover:text-secondary-foreground',
				className
			)}
			{...props}
		>
			{children}
		</Link>
	)
}
