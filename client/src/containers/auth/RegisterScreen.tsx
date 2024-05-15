import AuthProvider from '@providers/AuthProvider'
import type { FC } from 'react'

import { Main } from '@containers/Main'
import { Meta } from '@containers/Meta'

import { RegisterCard } from './cards/RegisterCard'

export const RegisterScreen: FC = () => {
	return (
		<Meta title='Register'>
			<AuthProvider forAuth={false}>
				<Main className='h-screen-64 flex justify-center items-center select-none bg-white'>
					<RegisterCard />
				</Main>
			</AuthProvider>
		</Meta>
	)
}
