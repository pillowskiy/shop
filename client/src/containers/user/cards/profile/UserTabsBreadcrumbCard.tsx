import { MCard } from '@common/Card'
import { opacityListAnimation } from '@lib/animations'
import type { FC } from 'react'

import { HoverInfoCard } from '@components/HoverInfoCard'

import { Button } from '@ui/Button'

export const UserTabsBreadcrumbCard: FC = () => {
	return (
		<HoverInfoCard
			title='Sorry for the inconvenience'
			description='This feature is currently under development'
		>
			<MCard
				className='flex justify-start md:justify-center gap-2 px-4 py-1 mt-4 select-none bg-popover overflow-x-auto'
				initial='initial'
				animate='animate'
				custom={2}
				variants={opacityListAnimation}
			>
				<Button className='text-sm h-8' disabled>
					Comments
				</Button>
				<Button className='text-sm h-8 bg-muted' disabled>
					Disputes
				</Button>
				<Button className='text-sm h-8 bg-muted' disabled>
					Warnings
				</Button>
				<Button className='text-sm h-8 bg-muted' disabled>
					Bans
				</Button>
			</MCard>
		</HoverInfoCard>
	)
}
