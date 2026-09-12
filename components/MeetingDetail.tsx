"use client"
import { useEffect, useState, type ReactNode } from "react";
import { SacramentMeeting } from "@/lib/types";

function formatMeetingDate(iso: string) {
    const [year, month, day] = iso.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function Divider() {
    return (
        <div className="flex items-center justify-center gap-2 py-6">
            <span className="h-px w-12 bg-border" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="h-px w-12 bg-border" />
        </div>
    );
}

function SectionTitle({ children }: { children: ReactNode }) {
    return <h2 className="font-serif text-lg text-accent">{children}</h2>;
}

function Row({ label, value }: { label: string; value?: string | null }) {
    if (!value) return null;
    return (
        <div className="flex items-baseline justify-between gap-4 border-b border-border py-2 last:border-0">
            <span className="text-sm text-foreground-muted">{label}</span>
            <span className="text-right font-serif text-[15px] text-foreground">{value}</span>
        </div>
    );
}

function HymnRow({
    label,
    hymn,
}: {
    label: string;
    hymn?: { number: number; title: string };
}) {
    if (!hymn) return null;
    return (
        <div className="flex items-baseline justify-between gap-4 border-b border-border py-2 last:border-0">
            <span className="text-sm text-foreground-muted">{label}</span>
            <span className="text-right font-serif text-[15px] text-foreground">
                Hymn {hymn.number}: {hymn.title}
            </span>
        </div>
    );
}

export default function MeetingDetail({ id }: { id: number }) {
    const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function getMeetingDetails() {
            try {
                const res = await fetch(`/api/meetings/${id}`);
                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message ?? "Failed to load meeting");
                }
                if (!cancelled) {
                    setMeeting(result.meeting);
                }
            } catch (err) {
                console.error(err);
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : "Failed to load meeting");
                }
            }
        }

        getMeetingDetails();

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (error) {
        return (
            <div className="mx-auto max-w-xl px-4 py-10 text-center">
                <p className="text-sm text-state-overdue">{error}</p>
            </div>
        );
    }

    if (!meeting) {
        return (
            <div className="mx-auto max-w-xl px-4 py-10 text-center">
                <p className="text-sm text-foreground-muted">Loading program…</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-xl px-4 py-10">
            <div className="rounded-sm border border-border bg-surface px-6 py-10 shadow-sm sm:px-12">
                {/* Header */}
                <div className="text-center">
                    <p className="text-xs text-foreground-subtle">{formatMeetingDate(meeting.date)}</p>
                    <h1 className="mt-3 font-serif text-3xl text-foreground">{meeting.meetingType.charAt(0).toUpperCase() + meeting.meetingType.slice(1)}</h1>
                    <div className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-1 text-sm text-foreground-muted">
                        {meeting.presiding && (
                            <span>
                                Presiding <span className="text-foreground">{meeting.presiding}</span>
                            </span>
                        )}
                        {meeting.conducting && (
                            <span>
                                Conducting <span className="text-foreground">{meeting.conducting}</span>
                            </span>
                        )}
                    </div>
                </div>

                <Divider />

                {/* Announcements */}
                {meeting.announcements && meeting.announcements.length > 0 && (
                    <>
                        <section>
                            <SectionTitle>Announcements</SectionTitle>
                            <ul className="mt-3 space-y-2">
                                {meeting.announcements.map((item, i) => (
                                    <li key={i} className="flex gap-2 text-[15px] text-foreground-muted">
                                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground-subtle" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <Divider />
                    </>
                )}

                {/* Opening */}
                <section>
                    <SectionTitle>Opening exercises</SectionTitle>
                    <div className="mt-3">
                        <HymnRow label="Opening hymn" hymn={meeting.openingHymn} />
                        <Row label="Invocation" value={meeting.openingPrayer} />
                    </div>
                </section>

                {/* Ward / stake business */}
                {(meeting.wardBusiness.length > 0 || meeting.stakeBusiness) && (
                    <>
                        <Divider />
                        <section>
                            <SectionTitle>Ward and stake business</SectionTitle>
                            <ul className="mt-3 space-y-2">
                                {meeting.wardBusiness.map((item, i) => (
                                    <li key={i} className="text-[15px] text-foreground-muted">
                                        {item.description && (
                                            <span className="block text-sm text-foreground-subtle">
                                                {item.description}
                                            </span>
                                        )}
                                    </li>
                                ))}
                                {meeting.stakeBusiness && (
                                    <li className="text-[15px] text-foreground-muted">
                                        Stake business will be conducted.
                                    </li>
                                )}
                            </ul>
                        </section>
                    </>
                )}

                <Divider />

                {/* Sacrament — the focal point of the program */}
                <section className="rounded-sm bg-accent-soft px-5 py-5 text-center">
                    <p className="text-xs text-accent">Sacrament hymn</p>
                    <p className="mt-1 font-serif text-lg text-foreground">
                        Hymn {meeting.sacramentHymn.number}: {meeting.sacramentHymn.title}
                    </p>
                </section>

                {/* Speakers */}
                {meeting.speakers.length > 0 && (
                    <>
                        <Divider />
                        <section>
                            <SectionTitle>Speakers</SectionTitle>
                            <ol className="mt-3 space-y-3">
                                {meeting.speakers.map((speaker, i) => (
                                    <li key={i} className="flex items-baseline gap-3">
                                        <span className="font-serif text-sm text-gold">{i + 1}</span>
                                        <div>
                                            <p className="text-[15px] text-foreground">{speaker.name}</p>
                                            {speaker.topic && (
                                                <p className="text-sm text-foreground-muted">{speaker.topic}</p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </>
                )}

                <Divider />

                {/* Closing */}
                <section>
                    <SectionTitle>Closing</SectionTitle>
                    <div className="mt-3">
                        <HymnRow label="Closing hymn" hymn={meeting.closingHymn} />
                        <Row label="Benediction" value={meeting.closingPrayer} />
                    </div>
                </section>
            </div>
        </div>
    );
}