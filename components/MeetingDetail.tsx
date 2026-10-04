"use client"
import { useEffect, useState, type ReactNode } from "react";
import DeleteMeetingButton from "./DeleteBtn";
import { notFound } from "next/navigation";

/* ---------- Safe shape + normalizer ---------- */

type Hymn = { number: number | null; title: string };

type SafeMeeting = {
    date: string;
    meetingType: string;
    presiding: string;
    conducting: string;
    announcements: string[];
    openingHymn: Hymn | null;
    openingPrayer: string;
    wardBusiness: string[];
    stakeBusiness: boolean;
    sacramentHymn: Hymn | null;
    speakers: { name: string; topic: string }[];
    closingHymn: Hymn | null;
    closingPrayer: string;
};

const isObj = (v: unknown): v is Record<string, unknown> =>
    typeof v === "object" && v !== null && !Array.isArray(v);

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

function toHymn(v: unknown): Hymn | null {
    if (!isObj(v)) return null;
    const n = typeof v.number === "number" ? v.number : parseInt(String(v.number), 10);
    const number = Number.isFinite(n) ? n : null;
    const title = str(v.title);
    if (number === null && !title) return null;
    return { number, title };
}

function normalizeMeeting(raw: unknown): SafeMeeting | null {
    if (!isObj(raw)) return null;

    return {
        date: str(raw.date),
        meetingType: str(raw.meetingType),
        presiding: str(raw.presiding),
        conducting: str(raw.conducting),
        announcements: arr(raw.announcements).map(str).filter(Boolean),
        openingHymn: toHymn(raw.openingHymn),
        openingPrayer: str(raw.openingPrayer),
        // accepts either strings or { description } objects
        wardBusiness: arr(raw.wardBusiness)
            .map((item) => (isObj(item) ? str(item.description) : str(item)))
            .filter(Boolean),
        stakeBusiness: Boolean(raw.stakeBusiness),
        sacramentHymn: toHymn(raw.sacramentHymn),
        speakers: arr(raw.speakers)
            .filter(isObj)
            .map((s) => ({ name: str(s.name), topic: str(s.topic) }))
            .filter((s) => s.name),
        closingHymn: toHymn(raw.closingHymn),
        closingPrayer: str(raw.closingPrayer),
    };
}



function formatMeetingDate(iso: string) {
    // slice handles both "2026-09-28" and "2026-09-28T00:00:00.000Z"
    const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
    if (!year || !month || !day) return "";
    const date = new Date(year, month - 1, day);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function formatHymn(h: Hymn) {
    return [h.number !== null ? `Hymn ${h.number}` : "Hymn", h.title]
        .filter(Boolean)
        .join(": ");
}

function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
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

function HymnRow({ label, hymn }: { label: string; hymn: Hymn | null }) {
    if (!hymn) return null;
    return <Row label={label} value={formatHymn(hymn)} />;
}


export default function MeetingDetail({ id }: { id: number }) {
    const [meeting, setMeeting] = useState<SafeMeeting | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [missing, setMissing] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function getMeetingDetails() {
            try {
                const res = await fetch(`/api/meetings/${id}`);
                if (res.status === 404) {
                    if (!cancelled) setMissing(true);
                    return;
                }
                if (!res.ok) throw new Error("Failed to load meeting");

                const result = await res.json();
                // tolerate both { meeting: {...} } and a bare meeting object
                const normalized = normalizeMeeting(result?.meeting ?? result);
                if (!normalized) throw new Error("Unexpected response from server");

                if (!cancelled) setMeeting(normalized);
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

    if (missing) notFound();

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

    const formattedDate = formatMeetingDate(meeting.date);
    const hasOpening = meeting.openingHymn || meeting.openingPrayer;
    const hasWardStake = meeting.wardBusiness.length > 0 || meeting.stakeBusiness;
    const hasClosing = meeting.closingHymn || meeting.closingPrayer;

    return (
        <div className="mx-auto max-w-xl px-4 py-10">
            <DeleteMeetingButton id={id} />
            <div className="rounded-sm border border-border bg-surface px-6 py-10 shadow-sm sm:px-12">
                {/* Header */}
                <div className="text-center">
                    {formattedDate && (
                        <p className="text-xs text-foreground-subtle">{formattedDate}</p>
                    )}
                    <h1 className="mt-3 font-serif text-3xl text-foreground">
                        {capitalize(meeting.meetingType) || "Meeting program"}
                    </h1>
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
                {meeting.announcements.length > 0 && (
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
                {hasOpening && (
                    <section>
                        <SectionTitle>Opening exercises</SectionTitle>
                        <div className="mt-3">
                            <HymnRow label="Opening hymn" hymn={meeting.openingHymn} />
                            <Row label="Invocation" value={meeting.openingPrayer} />
                        </div>
                    </section>
                )}

                {/* Ward / stake business */}
                {hasWardStake && (
                    <>
                        {hasOpening && <Divider />}
                        <section>
                            <SectionTitle>Ward and stake business</SectionTitle>
                            <ul className="mt-3 space-y-2">
                                {meeting.wardBusiness.map((item, i) => (
                                    <li key={i} className="text-[15px] text-foreground-muted">
                                        {item}
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

                {/* Sacrament */}
                {meeting.sacramentHymn && (
                    <>
                        {(hasOpening || hasWardStake) && <Divider />}
                        <section className="rounded-sm bg-accent-soft px-5 py-5 text-center">
                            <p className="text-xs text-accent">Sacrament hymn</p>
                            <p className="mt-1 font-serif text-lg text-foreground">
                                {formatHymn(meeting.sacramentHymn)}
                            </p>
                        </section>
                    </>
                )}

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

                {/* Closing */}
                {hasClosing && (
                    <>
                        <Divider />
                        <section>
                            <SectionTitle>Closing</SectionTitle>
                            <div className="mt-3">
                                <HymnRow label="Closing hymn" hymn={meeting.closingHymn} />
                                <Row label="Benediction" value={meeting.closingPrayer} />
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}