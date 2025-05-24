import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export function Consent() {
    return (
        <Card className="flex flex-col gap-4">
            <CardHeader>
                <CardTitle>Event Consent</CardTitle>
                <CardDescription>
                    Please accept the Terms & Conditions below.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>This is just a placeholder</p>
            </CardContent>
        </Card>
    );
}
