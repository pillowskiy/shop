import { MoreHorizontal } from 'lucide-react'
import type { FC, HTMLAttributes } from 'react'

import { UserMoreActionsPopup } from '@containers/user/layout/UserMoreActionsPopup'

import { Button } from '@ui/Button'

interface UserActionButtons extends HTMLAttributes<HTMLDivElement> {}

export const UserActionButtons: FC<UserActionButtons> = ({ ...props }) => {
	return (
		<section {...props}>
			<Button className='w-full mt-2' disabled>
				Write a message
			</Button>
			<section className='flex gap-2 mt-2'>
				<Button className='w-full' disabled>
					Subscribe
				</Button>
				<UserMoreActionsPopup>
					<Button className='px-2'>
						<MoreHorizontal />
					</Button>
				</UserMoreActionsPopup>
			</section>
		</section>
	)
}
