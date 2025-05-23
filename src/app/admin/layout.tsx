import AuthHeader from '@/components/AuthHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthHeader />
            <main className="p-4">{children}</main>
        </>
    );
}
