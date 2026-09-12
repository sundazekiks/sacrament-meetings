"use client"
import MeetingCard from "@/components/MeetingCard";
import { SacramentMeeting } from "@/lib/types";
import { useEffect, useState } from "react";


export default function Meetings() {
    const [meetings, setMeetings] = useState<SacramentMeeting[] | []>([])
    useEffect(() => {
        async function Meetings() {
            const res = await fetch("/api/meetings");
            if (!res.ok) throw new Error();
            const results = await res.json()
            setMeetings(results.meetings)
        }
        Meetings();
    }, [])
    return (<div className="p-2 flex flex-wrap gap-4">
        {
            meetings.length < 1 ? <h1>Loading...</h1> :
                meetings.map(item => {
                    return (<MeetingCard key={item.id}
                        {...item} />)
                })
        }
    </div>)
}