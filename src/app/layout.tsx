import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter, Luckiest_Guy, Montserrat } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import React from 'react';
import Script from 'next/script';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
});

const luckiestGuy = Luckiest_Guy({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-luckiest',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Motlow Creek Baptist Church VBS Registration',
    description: 'Register for VBS at Motlow Creek Baptist Church',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider afterSignOutUrl="/">
            <html
                lang="en"
                className={`${inter.variable} ${montserrat.variable} ${luckiestGuy.variable}`}
                suppressHydrationWarning>
                <body
                    className={cn(
                        'flex min-h-screen flex-col',
                        inter.className,
                    )}>
                    <main>{children}</main>
                    <Toaster richColors />
                    {/* @ts-expect-error - GoogleAnalytics is a valid component */}
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
                    <Script
                        id="clarity-script"
                        strategy="afterInteractive"
                        type="text/javascript"
                        dangerouslySetInnerHTML={{
                            __html: `(function(c,l,a,r,i,t,y){
                              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");`,
                        }}
                    />
                </body>
            </html>
        </ClerkProvider>
    );
}
