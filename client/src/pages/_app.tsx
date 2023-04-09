import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import AuthProvider from '@/providers/auth/AuthProvider';
import { TAuthFields } from '@/providers/auth/types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps & TAuthFields) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider Component={{isOnlyUser: Component.isOnlyUser}}>
            <Component {...pageProps} />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}
