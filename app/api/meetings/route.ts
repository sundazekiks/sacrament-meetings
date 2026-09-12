import { getMeetings } from "@/lib/meetings-db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const date = new URL(request.url).searchParams.get("date") || null;
        const meetings = getMeetings(date);
        return NextResponse.json({ meetings: meetings }, { status: 200 })
    } catch (err) { //eslint-disable-line
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}