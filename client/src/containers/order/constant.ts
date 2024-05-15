export const orderDateFilter = {
	all: new Date(0),
	monthly: new Date(Date.now() - 3600 * 24 * 30),
	'half-yearly': new Date(Date.now() - 3600 * 24 * 30 * 6),
	yearly: new Date(new Date().getFullYear() - 1)
} as const
