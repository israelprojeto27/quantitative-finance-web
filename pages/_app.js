import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';                         
import { Provider } from 'next-auth/client';
import NProgress from 'nprogress';
import { Router } from 'next/dist/client/router';
import 'nprogress/nprogress.css';
import MyThemeProvider from '../components/MyThemeProvider';
import { SettingsProvider } from '../contexts/SettingsContext';
import { createContext, useEffect, useState } from 'react';

function MyApp(props) {
    const { Component, pageProps } = props;

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);


    return (
        <>
            <Head>
                <title>My page</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <Provider session={pageProps.session}>
                <SettingsProvider>
                    <MyThemeProvider>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Component {...pageProps} />
                    </MyThemeProvider>
                </SettingsProvider>
            </Provider>

            <style global jsx>
                {`
                    #nprogress {
                        position: relative;
                        z-index: 9999999;
                    }
                    #nprogress .bar {
                        background: #f44336 !important;
                        height: 3px;
                    }
                `}
            </style>
        </>
    );
}

export default MyApp;