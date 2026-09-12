import { AppError } from "@/components/AppError";
import { getMeetingById } from "@/lib/meetings-db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await params).id)
        if (!id) throw new AppError("Please provide a valid id", 400);
        const meeting = getMeetingById(id);
        if (!meeting) throw new AppError("Meeting does not exist", 404);
        return NextResponse.json({ meeting: meeting }, { status: 200 })
    } catch (err) {
        if (err instanceof AppError) return NextResponse.json({ message: err.message }, { status: err.code })
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}