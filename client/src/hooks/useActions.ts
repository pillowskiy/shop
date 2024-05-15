import {
	ActionCreator,
	ActionCreatorsMapObject,
	AsyncThunk,
	bindActionCreators
} from '@reduxjs/toolkit'
import { useMemo } from 'react'

import { useAppDispatch } from '@redux/store'
import * as actions from '@redux/user/user.actions'

type BoundActions<Actions extends ActionCreatorsMapObject> = {
	[key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
		? BoundAsyncThunk<Actions[key]>
		: Actions[key]
}

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
	...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>

export const useActionCreatorsTyped = <
	Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject
>(
	actions: Actions
): BoundActions<Actions> => {
	const dispatch = useAppDispatch()

	return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}

export const useUserActions = () => useActionCreatorsTyped(actions)
