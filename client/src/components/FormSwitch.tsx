'use client'

import { cn } from '@lib/utils'
import type { SwitchProps } from '@radix-ui/react-switch'
import { type FC, useId } from 'react'

import { Label } from '@ui/Label'
import { Switch } from '@ui/Switch'

interface FormSwitchProps extends SwitchProps {
	label: string
}

export const FormSwitchBox: FC<FormSwitchProps> = ({
	label,
	className,
	...props
}) => {
	const id = useId()
	return (
		<div className={cn('flex items-center space-x-2', className)}>
			<Label htmlFor={id}>{label}</Label>
			<Switch id={id} {...props} />
		</div>
	)
}
