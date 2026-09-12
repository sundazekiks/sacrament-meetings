export function getSundayISO(): string {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)

    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek); // roll back to Sunday
    sunday.setHours(0, 0, 0, 0); // zero out the time

    const year = sunday.getFullYear();
    const month = String(sunday.getMonth() + 1).padStart(2, "0");
    const day = String(sunday.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // e.g. "2026-09-13"
}