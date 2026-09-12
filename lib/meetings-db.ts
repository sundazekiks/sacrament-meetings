import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-05-03',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 2, title: 'The Spirit of God' },
        openingPrayer: 'Sister Williams',
        wardBusiness: [{ description: 'Sustaining of new Primary president' }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
        speakers: [
            { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
            { name: 'Youth Choir', topic: '', type: 'musical-number' }
        ],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Davis',
        announcements: ['Ward temple night: May 10']
    },
    {
        id: 2,
        date: '2026-05-10',
        meetingType: 'testimony',
        presiding: 'Bishop Smith',
        conducting: 'Brother Anderson',
        openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
        openingPrayer: 'Brother Martinez',
        wardBusiness: [{ description: 'Release of Sister Clark as Relief Society counselor' }],
        stakeBusiness: false,
        sacramentHymn: { number: 172, title: 'O Thou Before the World Began' },
        speakers: [],
        closingHymn: { number: 85, title: 'How Firm a Foundation' },
        closingPrayer: 'Sister Nguyen',
        announcements: ['Fast offerings due by end of month', 'Youth activity: May 15']
    },
    {
        id: 3,
        date: '2026-05-17',
        meetingType: 'stake',
        presiding: 'President Taylor',
        conducting: 'Bishop Smith',
        openingHymn: { number: 249, title: 'Called to Serve' },
        openingPrayer: 'Brother Lee',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 193, title: "'Tis Sweet to Sing the Matchless Love" },
        speakers: [
            { name: 'Elder Ramirez', topic: 'Missionary Work', type: 'speaker' },
            { name: 'Stake Choir', topic: '', type: 'musical-number' },
            { name: 'Sister Patel', topic: 'Sabbath Observance', type: 'speaker' }
        ],
        closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
        closingPrayer: 'Brother Kim',
        announcements: ['Stake conference broadcast in Relief Society room', 'New stake calendar available']
    },
    {
        id: 4,
        date: '2026-09-06',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 27, title: 'Praise to the Man' },
        openingPrayer: 'Sister Garcia',
        wardBusiness: [
            { description: 'Sustaining of new Elders Quorum president' },
            { description: 'Release of Brother Wilson as Ward Clerk' }
        ],
        stakeBusiness: false,
        sacramentHymn: { number: 181, title: 'Reverently and Meekly Now' },
        speakers: [
            { name: 'Brother Thompson', topic: 'The Atonement of Jesus Christ', type: 'speaker' },
            { name: 'Sister Johnson', topic: 'Family Home Evening', type: 'speaker' },
            { name: 'Primary Children', topic: '', type: 'musical-number' }
        ],
        closingHymn: { number: 301, title: 'Love One Another' },
        closingPrayer: 'Brother Nguyen',
        announcements: ['Ward campout: June 6-7', 'Primary program practice after church']
    }
    // ... add remaining records
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) return meetings.filter(m => m.date === date);
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find(m => m.id === id) ?? null;
}