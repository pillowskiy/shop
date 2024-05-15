import { Variants } from 'framer-motion'

export const opacityListAnimation: Variants = {
	initial: {
		opacity: 0
	},
	animate: (custom: number) => ({
		opacity: 1,
		transition: { delay: custom * 0.1 }
	})
}

export const transformBottomY: Variants = {
	initial: {
		y: 300,
		opacity: 0
	},
	animate: (custom: number) => ({
		y: 0,
		opacity: 1,
		transition: { delay: custom * 0.2 }
	})
}
