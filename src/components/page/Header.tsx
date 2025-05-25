import McbcLogo from '@/assets/mcbc-logo/McbcTransparentLogo.svg';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
    return (
        <header className="w-full max-w-4xl rounded-2xl border-b bg-white/50 shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-2">
                <Link href="/" className="flex items-center space-x-4">
                    <Image
                        src={McbcLogo}
                        alt="Motlow Creek Baptist Church Logo"
                        width={40}
                        height={40}
                        className="size-50 justify-self-start"
                    />
                </Link>
                <Link href="/admin">
                    <Button variant="outline">Admin</Button>
                </Link>
            </div>
        </header>
    );
}
