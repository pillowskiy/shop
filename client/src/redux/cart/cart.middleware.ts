import { setLocalStorage } from '@lib/utils'
import type { AnyAction, Middleware } from 'redux'

import type { RootState } from '@redux/store'

export const cartMiddleware: Middleware<{}, RootState> =
	store => next => (action: AnyAction) => {
		const result = next(action)
		const state = store.getState()

		setLocalStorage('cart', JSON.stringify(state.cart.items))

		return result
	}
