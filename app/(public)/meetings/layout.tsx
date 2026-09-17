import { Suspense } from "react";


export default function MeetingLayout({ children }: { children: React.ReactNode }) {
    return (<div className="w-full min-h-full p-4">
        <Suspense>
            {children}
        </Suspense>
    </div>)
}