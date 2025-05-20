import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
    return (
        <header className="w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <img
                        src="/api/assets?file=mcbc/mcbcLogo/TransparentLogoLined.svg"
                        alt="MCBC Logo"
                        width={40}
                        height={40}
                        className="size-100"
                    />
                </Link>
                <Link href="/admin">
                    <Button variant="outline">Admin</Button>
                </Link>
            </div>
        </header>
    );
}
