import { SacramentMeeting } from "@/lib/types";
import Image from "next/image";
import sacLog from "@/public/sacrament-logo.webp";
import Link from "next/link";
export default function MeetingCard({
    id,
    presiding,
    date,
    meetingType,
    announcements,
    wardBusiness,
}: SacramentMeeting) {
    return (
        <Link href={`/meetings/${id}`} className="p-4 flex gap-4 rounded-xl bg-surface border border-border shadow-sm hover:bg-accent-soft cursor-pointer">
            <Image
                src={sacLog}
                alt="Sacrament meeting logo"
                className="rounded-lg w-14 h-14 object-cover shrink-0"
            />

            <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-foreground">{date}</h2>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-cat-worship-bg text-cat-service ">
                        {meetingType.charAt(0).toUpperCase() + meetingType.slice(1)}
                    </span>
                </div>

                <p className="text-sm text-foreground-muted">
                    Presiding: <span className="text-foreground">{presiding}</span>
                </p>

                <div className="flex gap-4 text-sm text-foreground-muted mt-1">
                    <span>
                        {announcements?.length ?? 0} announcement
                        {announcements?.length === 1 ? "" : "s"}
                    </span>
                    <span>
                        {wardBusiness.length} ward business item
                        {wardBusiness.length === 1 ? "" : "s"}
                    </span>
                </div>
            </div>
        </Link>
    );
}