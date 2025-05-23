import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-2">
            <Header />
            {/* TODO: Add form here (use a Form component to avoid making this a client component) */}
            <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
            </main>
            <Footer />
        </div>
    );
}
