import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@common/Card'
import type { FC } from 'react'

import { RegisterForm } from '../forms/RegisterForm'

export const RegisterCard: FC = () => {
	return (
		<Card className='w-[480px] py-6 px-6 animate-card-in'>
			<CardHeader className='text-center mb-6'>
				<CardTitle className='text-4xl font-medium'>Registration</CardTitle>
				<CardDescription>Create your account right now!</CardDescription>
			</CardHeader>

			<CardContent>
				<RegisterForm />
			</CardContent>
		</Card>
	)
}
