import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
    const { userId } = await auth();
    if (!userId) redirect('/sign-in');

    return <div>Admin content here</div>;
}
