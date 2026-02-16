import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET() {
    try {
        const data = await client.fetch(`*[_type == "siteSettings"][0]{ logo }`);
        return NextResponse.json(data || {});
    } catch (error) {
        console.error('Error fetching logo:', error);
        return NextResponse.json({ error: 'Failed to fetch logo' }, { status: 500 });
    }
}
