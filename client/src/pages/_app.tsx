import { Toaster } from '@common/toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { Aside, Header } from '@containers/containers'

import { persistor, store } from '@redux/store'

import '@styles/globals.css'

import { AuthFields } from '@/types/providers/auth-provider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})
export default function App({
	Component,
	pageProps,
	router
}: AppProps & AuthFields) {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Toaster />
					<Header />
					<Aside />
					<AnimatePresence mode='wait' initial={false}>
						<Component {...pageProps} key={router.asPath} />
					</AnimatePresence>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}
