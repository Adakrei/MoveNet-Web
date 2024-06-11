import { NextRequest, NextResponse } from 'next/server';
import Config from '@/config/Config';

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();
    const response = await fetch(`${Config.getApiUrl()}/api?endpoint=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } else {
        const errorData = await response.json();
        return NextResponse.json(errorData, { status: response.status });
    }
}
