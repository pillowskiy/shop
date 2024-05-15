import ShippingService from '@api/services/shipping.service'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@common/Card'
import { buildToast, useToast } from '@common/toast/useToast'
import { opacityListAnimation } from '@lib/animations'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { type FC, useState } from 'react'

import { INITIAL_SHIPPING_DATA } from '@containers/shipping/constant'
import { CreateDeliveryForm } from '@containers/shipping/forms/CreateDeliveryForm'
import { MDeliveryMethod } from '@containers/shipping/layout/DeliveryMethod'

import { Button } from '@ui/Button'

import type { CreateShippingData } from '@/types/shipping.interface'

export const ShippingTab: FC = () => {
	const [data, setData] = useState<CreateShippingData>(INITIAL_SHIPPING_DATA)
	const [errors, setErrors] = useState<
		Partial<Record<keyof CreateShippingData, string>>
	>({})
	const { toast } = useToast()

	const { mutate } = useMutation(
		['create shipping'],
		() => {
			return ShippingService.createShipping(data)
		},
		{
			onMutate: () => setErrors({}),
			onSuccess: () => {
				toast(buildToast('users.delivery.creation.success').toast)
				setData(INITIAL_SHIPPING_DATA)
			},
			onError: err => {
				if (!isAxiosError(err)) return
				const errors = err.response?.data?.errors
				if (errors) {
					setErrors(errors)
				} else {
					toast(
						buildToast('error', {
							error: err.response?.data?.message || 'Unhandled error occurred!'
						}).toast
					)
				}
			}
		}
	)

	const { data: shipping } = useQuery(
		['get shipping'],
		() => {
			return ShippingService.getAll()
		},
		{
			select: ({ data }) => data
		}
	)

	return (
		<Card className='bg-popover animate-card-in px-1'>
			<CardHeader>
				<CardTitle>Shipping</CardTitle>
				<CardDescription>
					Give us your details to automate the delivery.
				</CardDescription>
			</CardHeader>
			<CardContent className='md:max-h-[600px] overflow-y-auto rounded-lg z-40'>
				<section className='flex flex-col space-y-1.5'>
					<h2 className='font-medium'>Delivery Methods:</h2>
					{shipping?.length ? (
						shipping.map(method => (
							<MDeliveryMethod
								key={method.id}
								initial='initial'
								animate='animate'
								custom={3}
								variants={opacityListAnimation}
								shipping={method}
							/>
						))
					) : (
						<div className='text-center text-lg font-medium p-2 rounded-lg border bg-white'>
							🚩 There are no delivery methods yet.
						</div>
					)}
				</section>
				<CreateDeliveryForm data={data} errors={errors} setData={setData} />
			</CardContent>
			<CardFooter className='pt-2'>
				<Button onClick={() => mutate()}>Create a delivery method</Button>
			</CardFooter>
		</Card>
	)
}
