"use client"
import { House, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import NavLinks from './NavLinks';
import Link from 'next/link';

export default function LocationDropdown() {
    const [active, setActive] = useState(false);

    return (
        <div className='flex gap-2'>
            <div
                className="relative  w-fit bg-background "
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
            >
                <button
                    className="flex items-center gap-2 p-4"
                    aria-haspopup="true"
                    aria-expanded={active}
                >
                    <House />
                    <span>Quirino 1st Ward</span>
                    <ChevronDown className="text-gray-400 transition-colors hover:text-black" />
                </button>

                {active && (
                    <div className="absolute right-0 top-full z-10 w-fit  bg-surface p-2 shadow-sm ">
                        <NavLinks />
                    </div>
                )}

            </div>
            <Link href={`/meetings/current`}
                className="flex items-center gap-2 rounded-sm border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent-hover m-2 cursor-pointer"
                aria-expanded={active}
            >
                Current
            </Link>
        </div>
    );
}