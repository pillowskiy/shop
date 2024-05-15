import { AxiosError, type InternalAxiosRequestConfig } from 'axios'

interface InterceptorError extends AxiosError<unknown, unknown> {
	config: InternalAxiosRequestConfig & { retried?: boolean }
}

export function isInterceptorError(
	payload: unknown
): payload is InterceptorError {
	return payload instanceof AxiosError
}

export function isUnhandledAuthError({ response, config }: InterceptorError) {
	return response?.status === 401 && !config?.retried
}
