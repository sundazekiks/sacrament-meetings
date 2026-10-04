import MeetingForm from "@/components/MeetingEditForm";
import { updatingMeeting } from "@/lib/action";
import { getMeetingById } from "@/lib/meetings-db";


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const meeting = await getMeetingById(Number(id));
    return (<MeetingForm sacramentMeeting={meeting} onSave={updatingMeeting} />)
}