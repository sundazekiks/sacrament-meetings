'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1'); // always reset to page 1 on a new search
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (<div className="flex flex-col gap-1.5">
        <label htmlFor="meeting-search" className="text-sm font-medium text-foreground">
            Search
        </label>
        <input
            id="meeting-search"
            type="search"
            placeholder="Search by speaker, leader, or meeting type..."
            defaultValue={searchParams.get('query')?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search meetings"
            className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-foreground placeholder:text-foreground-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
        />
    </div>
    );
}