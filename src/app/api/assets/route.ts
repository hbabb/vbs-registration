// Import required AWS S3 SDK functions
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';

// Create the S3 client configured for DigitalOcean Spaces
const s3 = new S3Client({
    region: process.env.DO_SPACES_REGION, // DO Spaces uses 'us-east-1' even for nyc3
    endpoint: process.env.DO_SPACES_ENDPOINT, // Your Spaces region endpoint
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY!, // from .env.local
        secretAccessKey: process.env.DO_SPACES_SECRET!, // from .env.local
    },
});

// GET /api/assets?file=path/to/file.svg
export async function GET(req: Request) {
    try {
        // Extract the file key from the query string (?file=...)
        const url = new URL(req.url);
        const key = url.searchParams.get('file');

        // Reject if the query param is missing
        if (!key) {
            return new NextResponse('Missing "file" parameter', { status: 400 });
        }

        // Prepare a signed URL to fetch the private object from DO Spaces
        const command = new GetObjectCommand({
            Bucket: process.env.DO_SPACES_BUCKET!, // from .env.local
            Key: key, // path in your Space, e.g., "folder/image.svg"
        });

        // Generate a signed URL valid for 60 seconds
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

        // Fetch the file content from DO Spaces
        const fileRes = await fetch(signedUrl);

        // If the file isn't found, return 404
        if (!fileRes.ok) {
            return new NextResponse('File not found', { status: 404 });
        }

        // Clone headers and set proper caching
        const headers = new Headers(fileRes.headers);
        headers.set('Cache-Control', 'public, max-age=86400'); // 24-hour CDN cache

        // Return the file body as the response
        return new NextResponse(fileRes.body, {
            status: 200,
            headers,
        });
    } catch (err) {
        // Log and return 500 on unexpected errors
        console.error('ASSET API ERROR:', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
