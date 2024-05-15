import CategoryService from '@api/services/category.service'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem
} from '@common/Command'
import { Popover, PopoverContent, PopoverTrigger } from '@common/Popover'
import { cn } from '@lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronDown } from 'lucide-react'
import { type FC, useState } from 'react'

import { Button } from '@ui/Button'

interface CategorySelectProps {
	selectedCategories: number[]
	setCategories: (categories: number[]) => void
}

export const CategorySelect: FC<CategorySelectProps> = ({
	setCategories,
	selectedCategories
}) => {
	const [selected, setSelected] = useState<Record<number, boolean>>(
		Object.fromEntries(
			selectedCategories.map(id => {
				return [id, true]
			})
		)
	)
	const { data: categories, isLoading } = useQuery(
		['get categories'],
		() => {
			return CategoryService.getAll()
		},
		{
			select: ({ data }) => data
		}
	)

	const isDisabled = !categories?.length || isLoading

	const selectedKeys = Object.entries(selected)
		.filter(([_, value]) => value)
		.map(([key]) => +key)

	return (
		<Popover onOpenChange={open => !open && setCategories(selectedKeys)}>
			<PopoverTrigger asChild disabled={isDisabled}>
				<Button
					className='w-full flex flex-wrap gap-1 justify-start overflow-x-hidden bg-white text-foreground font-normal border py-1 h-fit mt-6'
					disabled={isDisabled}
				>
					{!Object.values(selected).filter(Boolean).length ||
					!categories?.length ? (
						<p className='my-1'>Categories</p>
					) : (
						selectedKeys.map(key => (
							<div
								className='first:ml-[-8px] h-full px-2 py-1 w-fit bg-muted rounded-lg'
								key={key}
							>
								{categories.find(category => category.id === key)?.name ||
									'Unknown'}
							</div>
						))
					)}
					<ChevronDown className='w-4 h-4 ml-auto' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0'>
				<Command className='bg-white'>
					<CommandInput placeholder='Find category' autoFocus />
					<CommandEmpty>No results found</CommandEmpty>
					<CommandGroup className='max-h-[200px] overflow-y-auto'>
						{categories &&
							categories.map(category => (
								<CommandItem
									key={category.id}
									onSelect={() =>
										setSelected({
											...selected,
											[category.id]: !Boolean(selected[category.id])
										})
									}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4 transition-all',
											Boolean(selected[category.id])
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
									{category.name}
								</CommandItem>
							))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
