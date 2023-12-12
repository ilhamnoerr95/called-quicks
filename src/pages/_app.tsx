// import '@/Styles/globals.css';
import '@/Styles/globals2.scss';
import {
    QueryClient,
    QueryClientProvider,
    QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import type { AppProps } from 'next/app';

// antd
import { Button } from 'antd';

export default function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary
                        onReset={reset}
                        fallbackRender={({ resetErrorBoundary }) => (
                            <div>
                                There was an error!
                                <Button onClick={() => resetErrorBoundary()}>
                                    Try again
                                </Button>
                            </div>
                        )}
                    >
                        <Component {...pageProps} />
                        <ReactQueryDevtools
                            initialIsOpen={false}
                            position="left"
                        />
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </QueryClientProvider>
    );
}
