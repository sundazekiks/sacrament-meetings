"use client"
import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
// import PageView from "@/components/PageView";
import { Pagination } from "@/components/Pagination";
import { SacramentMeeting } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Refactor to dynamic rendering; make this component a server component


export default function Meetings() {
    const [meetings, setMeetings] = useState<SacramentMeeting[] | []>([])
    const [totalPage, setTotalPage] = useState<number>(1)
    const queries = useSearchParams()
    const query = queries.get("query") || "";
    const page = queries.get("page") || "";
    useEffect(() => {
        async function Meetings() {
            const res = await fetch(`/api/meetings?${query ? `query=${query}` : ""}${page ? `&page=${page}` : ``}`);
            if (!res.ok) throw new Error();
            const results = await res.json()
            setMeetings(results.meetings)
            setTotalPage(results.totalPages)
        }
        Meetings();
    }, [query, page])
    return (<div className="p-4 flex flex-col gap-5">
        <div className="pt-2 top-0">
            <MeetingSearch />
            <Pagination totalPages={totalPage} />
        </div>
        {meetings.length < 1 ? (
            <div className="flex items-center justify-center py-12 text-foreground-muted text-sm">
                Loading meetings…
            </div>
        ) : (
            <ul className="flex flex-col gap-3">
                {meetings.map((item) => (
                    <MeetingCard key={item.id} {...item} />
                ))}
            </ul>
        )}
    </div>)
}