import ShippingService from '@api/services/shipping.service'
import { buildToast, useToast } from '@common/toast/useToast'
import { getShippingName } from '@lib/csc'
import { cn } from '@lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react'
import { forwardRef, useState } from 'react'

import { ConfirmDialog } from '@containers/dialog/ConfirmDialog'

import { Button } from '@ui/Button'

import type { Shipping } from '@/types/shipping.interface'

interface DeliveryMethodProps {
	shipping: Shipping
}

const DeliveryMethod = forwardRef<HTMLDivElement, DeliveryMethodProps>(
	({ shipping }) => {
		const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
		const queryClient = useQueryClient()
		const { toast } = useToast()

		const { mutate, isLoading } = useMutation(
			['delete shipping', shipping.id],
			() => {
				return ShippingService.deleteShipping(shipping.id)
			},
			{
				onSuccess: () => {
					toast(buildToast('users.delivery.delete.success').toast)
					return queryClient.invalidateQueries(['get shipping'])
				},
				onError: err => {
					if (!isAxiosError(err)) return
					toast(
						buildToast('error', {
							error: err?.response?.data?.message || 'Unhandled error occurred'
						}).toast
					)
				}
			}
		)

		return (
			<article
				className={cn(
					'p-2 rounded-lg bg-white shadow-sm flex flex-col gap-2',
					'sm:flex-row border',
					{ 'opacity-80': !!shipping.temp }
				)}
			>
				<section>
					<div className='flex gap-1 items-center'>
						<Package className='h-5 sm:h-4 w-auto' />
						<p className='text-lg sm:text-base font-medium'>
							{getShippingName(shipping)}
						</p>
					</div>
					<p className='text-sm sm:text-xs'>
						{shipping.temp
							? 'This method is temporary'
							: `Created: ${new Date(shipping.createdAt).toLocaleDateString()}`}
					</p>
				</section>
				<ConfirmDialog
					title='Shipping Deletion'
					description='Are you sure you want to remove the shipping method?'
					onConfirm={() => {
						mutate()
						setIsConfirmationOpen(false)
					}}
					onReject={() => setIsConfirmationOpen(false)}
					isOpen={isConfirmationOpen}
				>
					<Button
						className='w-full sm:w-auto ml-auto'
						variant='secondary'
						onClick={() => setIsConfirmationOpen(true)}
						disabled={isLoading || !!shipping.temp}
					>
						Delete
					</Button>
				</ConfirmDialog>
			</article>
		)
	}
)

DeliveryMethod.displayName = 'DeliveryMethod'
const MDeliveryMethod = motion<DeliveryMethodProps>(DeliveryMethod)
export { DeliveryMethod, MDeliveryMethod }
