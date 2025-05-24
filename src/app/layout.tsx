import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter, Luckiest_Guy, Montserrat } from 'next/font/google';
import './globals.css';

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
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
