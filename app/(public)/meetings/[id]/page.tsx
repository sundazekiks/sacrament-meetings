import MeetingDetail from "@/components/MeetingDetail";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const meetingId = Number(id)
    if (!meetingId) {
        notFound();
    }
    return (<div className="p-5">
        <MeetingDetail id={meetingId} />
    </div>)
}