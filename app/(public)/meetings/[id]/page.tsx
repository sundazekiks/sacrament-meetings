import MeetingDetail from "@/components/MeetingDetail";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const meetingId = Number(id)
    return (<div className="p-5">
        <MeetingDetail id={meetingId} />
    </div>)
}