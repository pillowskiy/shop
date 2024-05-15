import { Routes } from '@config'
import { cn } from '@lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

import { ProfilePopover } from '@containers/user/layout/ProfilePopover'

import { Button } from '@ui/Button'
import { Skeleton } from '@ui/Skeleton'

import { useProfile } from '@hooks/useProfile'

import { SearchBar } from './forms/SearchBar'

const Header = memo(() => {
	const { profile, isInitialLoading } = useProfile()

	return (
		<header
			className={cn(
				'sticky top-0 w-full flex justify-center',
				'px-custom h-16 items-center z-20 bg-popover md:px-[64px]'
			)}
		>
			<SearchBar />
			<section className='absolute right-0 md:mr-[48px] lg:mr-[126px] hidden md:block'>
				{isInitialLoading ? (
					<Skeleton className='w-11 h-11 rounded-full border cursor-pointer' />
				) : profile ? (
					<ProfilePopover profile={profile}>
						<Image
							className='w-11 h-11 object-cover object-top rounded-full border cursor-pointer select-none'
							src={profile.avatarURL}
							alt={profile.name}
							width={256}
							height={256}
						/>
					</ProfilePopover>
				) : (
					<Button asChild>
						<Link href={Routes.Login}>Login</Link>
					</Button>
				)}
			</section>
		</header>
	)
})
Header.displayName = 'Header'
export { Header }
