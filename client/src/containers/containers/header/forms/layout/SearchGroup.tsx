import type { FC, PropsWithChildren } from 'react'

interface SearchGroupProps {
	heading: string
}

export const SearchGroup: FC<PropsWithChildren<SearchGroupProps>> = ({
	heading,
	children
}) => {
	return (
		<section className='w-full'>
			<p className='text-xs text-primary ml-2 font-bold py-1'>{heading}</p>
			{children}
		</section>
	)
}
