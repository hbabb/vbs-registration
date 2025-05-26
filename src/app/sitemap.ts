import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://vbs.motlowcreekministries.com',
            lastModified: new Date(),
            priority: 1,
        },
    ];
}
