import { cn } from '@lib/utils'
import type { FC, HTMLAttributes, PropsWithChildren } from 'react'

interface EmptyItemsProps extends HTMLAttributes<HTMLDivElement> {}

export const EmptyItems: FC<PropsWithChildren<EmptyItemsProps>> = ({
	children,
	className,
	...props
}) => {
	return (
		<section
			className={cn(
				'text-3xl absolute left-[50%] top-[30%] md:top-[40%] lg:top-[50%] translate-x-[-50%]',
				'flex flex-col items-center justify-center text-center md:flex-row select-none',
				className
			)}
			{...props}
		>
			<p className='text-9xl lg:text-3xl mb-4 lg:mb-0'>🙅</p>
			{children}
		</section>
	)
}
