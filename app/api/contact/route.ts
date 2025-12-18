import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // NOTE: Replace with real email service (SendGrid, Mailgun, etc) or store to DB.
        console.log('Contact form received:', { name, email, message });

        // For now respond OK
        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
