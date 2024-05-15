import AuthProvider from '@providers/AuthProvider'
import type { FC } from 'react'

import { Main } from '@containers/Main'
import { Meta } from '@containers/Meta'

import { LoginCard } from './cards/LoginCard'

export const LoginScreen: FC = () => {
	return (
		<Meta title='Login'>
			<AuthProvider forAuth={false}>
				<Main className='h-screen-64 flex justify-center items-center select-none bg-white'>
					<LoginCard />
				</Main>
			</AuthProvider>
		</Meta>
	)
}
