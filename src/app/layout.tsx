import './globals.css';
import type {Metadata} from 'next';
import {CssBaseline, InitColorSchemeScript} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import theme from '@/theme';

export const metadata: Metadata = {
    title: 'Redstone',
    description: 'Minecraft Java & Bedrock servers management dashboard.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <InitColorSchemeScript attribute="class" />
                <AppRouterCacheProvider options={{enableCssLayer: true}}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        {children}
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
