import AuthService from '@api/services/auth.service'
import TokenService from '@api/services/token.service'
import { rejectAxios } from '@lib/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'

import type { AppDispatch, RootState } from '@redux/store'

import type { AuthResponse, LoginBody, RegisterBody } from '@/types'
import type { ApiReject, ApiValidationReject } from '@/types'

type AuthThunkConfig<T = unknown> = {
	state: RootState
	dispatch: AppDispatch
	rejectValue: ApiValidationReject<T> | ApiReject
}

export const register = createAsyncThunk<
	AuthResponse,
	RegisterBody,
	AuthThunkConfig<RegisterBody>
>('auth/register', async (data, api) => {
	try {
		const response = await AuthService.register(data)
		TokenService.setToken(response.data)
		return response.data
	} catch (err) {
		return api.rejectWithValue(rejectAxios(err))
	}
})

export const login = createAsyncThunk<
	AuthResponse,
	LoginBody,
	AuthThunkConfig<LoginBody>
>('auth/login', async (data, api) => {
	try {
		const response = await AuthService.login(data)
		TokenService.setToken(response.data)
		return response.data
	} catch (err) {
		return api.rejectWithValue(rejectAxios(err))
	}
})

export const logout = createAsyncThunk<
	{ refreshToken: string },
	void,
	AuthThunkConfig
>('auth/logout', async (_, api) => {
	try {
		const response = await AuthService.logout()
		return response.data
	} catch (err) {
		return api.rejectWithValue(rejectAxios(err))
	} finally {
		TokenService.deleteToken()
	}
})

export const checkAuth = createAsyncThunk<AuthResponse, void, AuthThunkConfig>(
	'auth/check-auth',
	async (_, api) => {
		try {
			const response = await AuthService.refresh()
			/* 
      Each request sends only a new "access token",
      so with each successful response,
      you need to overwrite the "access_token" field
      in the local storage to keep the token more up-to-date.
     */
			TokenService.setToken(response.data)
			return response.data
		} catch (err) {
			if (isAxiosError(err) && err.response?.status === 401) {
				api.dispatch(logout())
			}
			return api.rejectWithValue(rejectAxios(err))
		}
	}
)
