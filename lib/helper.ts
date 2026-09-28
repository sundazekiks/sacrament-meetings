
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

export function announcementUtil(announcements: string): Array<string> {
    const announces = announcements.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    return announces
}

export function hymnUtil(formData: FormData, prefix: string) {
    return {
        number: Number(formData.get(`${prefix}.number`)),
        title: formData.get(`${prefix}.title`) as string,
    }
}
export function wardBusinessUtil(business: string) {
    if (!business) return []
    const businesses = business.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    return businesses;
}

export function speakerUtil(formData: FormData) {
    const speakers = [];
    for (let i = 1; i <= 3; i++) {
        const speaker = {
            name: formData.get(`name${i}`),
            topic: formData.get(`topic${i}`),
            type: formData.get(`type${i}`)
        }
        speakers.push(speaker);
    }

    return speakers;
}
