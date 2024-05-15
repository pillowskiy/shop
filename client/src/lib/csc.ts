import { Country, State } from 'country-state-city'

import type { Shipping } from '@/types/shipping.interface'

export function getAddressPlaceholder(item: Shipping) {
	const country = Country.getCountryByCode(item.country)?.name
	const state = State.getStateByCodeAndCountry(item.state, item.country)?.name
	return { country, state, city: item?.city || '' }
}

export function getShippingName(method: Shipping) {
	return Object.values(getAddressPlaceholder(method)).join(' - ')
}
