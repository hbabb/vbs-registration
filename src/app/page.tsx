import { Footer } from '@/components/page/Footer';
import { Header } from '@/components/page/Header';
import { RegistrationForm } from '@/components/page/RegistrationForm';

export default function Home() {
    return (
        <div className="min-h-screen p-4">
            <div className="flex min-h-screen flex-col items-center md:rounded-lg md:bg-[url('/vbs-logo.jpg')] md:bg-contain md:bg-fixed md:bg-center md:bg-no-repeat">
                <Header />
                <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
                    <RegistrationForm />
                </main>
                <Footer />
            </div>
        </div>
    );
}
