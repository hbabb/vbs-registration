'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function AuthHeader() {
    return (
        <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    );
}
