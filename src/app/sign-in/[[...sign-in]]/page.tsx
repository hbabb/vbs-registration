import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="flex items-center justify-center h-screen">
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
