import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="flex h-screen items-center justify-center">
            <SignIn
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
                appearance={{
                    elements: {
                        formButtonPrimary: 'bg-blue-500 hover:bg-blue-600',
                    },
                }}
            />
        </div>
    );
}
