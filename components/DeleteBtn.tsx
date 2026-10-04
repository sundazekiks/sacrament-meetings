'use client';

import { useTransition } from 'react';
import { deletingMeeting } from '@/lib/action';

export default function DeleteMeetingButton({ id }: { id: number }) {
    const [isPending, startTransition] = useTransition();

    function handleDelete() {
        if (!confirm("Delete this meeting? This can't be undone.")) return;
        startTransition(() => {
            deletingMeeting(id);
        });
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            aria-label="Delete meeting"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-colors hover:bg-red-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
            {isPending ? (
                <span className="text-xs">...</span>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z"
                    />
                </svg>
            )}
        </button>
    );
}