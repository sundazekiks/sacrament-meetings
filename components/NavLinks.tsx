"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = ['home', 'meetings'];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col items-stretch gap-1 p-2">
            {links.map((item) => {
                const href = `/${item === "home" ? "" : item}`;
                const active = pathname === href;

                return (
                    <Link
                        key={item}
                        href={href}
                        className={`rounded-md px-3 py-2 text-sm capitalize transition-colors ${active
                            ? "bg-accent-soft text-accent font-medium"
                            : "text-foreground-muted hover:bg-surface hover:text-foreground"
                            }`}
                    >
                        {item}
                    </Link>
                );
            })}
        </nav>
    );
}