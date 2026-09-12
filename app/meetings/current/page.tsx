"use client"

import MeetingCard from "@/components/MeetingCard";
import { getSundayISO } from "@/lib/helper";
import { SacramentMeeting } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Current() {
    const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const isoDate = getSundayISO();
                const res = await fetch(`/api/meetings?date=${isoDate}`);
                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message ?? "Failed to load meetings");
                }

                // If your API returns { meetings: SacramentMeeting[] }, use it directly.
                // Keep the [0] only if the API actually nests an array of arrays.
                setMeetings(result.meetings ?? []);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : "Failed to load meetings");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="p-10 w-fit flex flex-col gap-2">
            <h1>Recent Sunday Service</h1>
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <p className="text-state-overdue">{error}</p>
            ) : meetings.length === 0 ? (
                <p>No meetings found.</p>
            ) : (
                meetings.map((item) => <MeetingCard key={item.id} {...item} />)
            )}
        </div>
    );
}   