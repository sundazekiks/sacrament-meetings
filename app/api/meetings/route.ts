import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // for the current page 
        const date = new URL(request.url).searchParams.get("date") || "";
        if (date) {
            const meeting = await getMeetings(date)
            return NextResponse.json({ meetings: meeting }, { status: 200 })
        }

        const query = new URL(request.url).searchParams.get("query") || "";
        const page = Number(new URL(request.url).searchParams.get("page")) || 1;
        const meetings = await getMeetings(query, page);
        const totalPages = await getMeetingsTotalPages(query)
        return NextResponse.json({ meetings: meetings, totalPages }, { status: 200 })
    } catch (err) { //eslint-disable-line
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}