import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@common/DropdownMenu'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import { Flag, UserX, Wallet } from 'lucide-react'
import type { FC, PropsWithChildren } from 'react'

interface UserMoreActionsPopupProps extends DropdownMenuProps {}

export const UserMoreActionsPopup: FC<
	PropsWithChildren<UserMoreActionsPopupProps>
> = ({ children, ...props }) => {
	return (
		<DropdownMenu {...props}>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuItem disabled>
						<UserX className='mr-2 h-4 w-4' />
						<span>Ignore</span>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>
						<Wallet className='mr-2 h-4 w-4' />
						<span>Open a money dispute</span>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>
						<Flag className='mr-2 h-4 w-4' />
						<span>Report</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
