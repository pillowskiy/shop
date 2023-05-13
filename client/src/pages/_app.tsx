import '@styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { persistor, store } from '@redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthFields } from '@/types/providers/auth-provider';
import {Toaster} from "@common/toast";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps & AuthFields) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Toaster />
            <Component {...pageProps}/>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}
