import type { SacramentMeeting } from './types';
import { sql } from './sql';
import { AppError } from '@/components/AppError';
const ITEMS_PER_PAGE = 4;

export async function getMeetings(
  query: string = '',
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM sacrament_meetings.meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*) FROM sacrament_meetings.meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM sacrament_meetings.meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? {};
}

// Mutation stubs — will be wired to the database in Week 04


export async function addMeeting(
  data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {

  const create = await sql`
  INSERT INTO sacrament_meetings.meetings (
    date,
    meeting_type,
    presiding,
    conducting,
    announcements,
    opening_hymn,
    opening_prayer,
    ward_business,
    stake_business,
    sacrament_hymn,
    speakers,
    closing_hymn,
    closing_prayer
  )
  VALUES (
    ${data.date},
    ${data.meetingType},
    ${data.presiding},
    ${data.conducting},
    ${data.announcements},
    ${JSON.stringify(data.openingHymn)},
    ${data.openingPrayer},
    ${data.wardBusiness ? JSON.stringify(data.wardBusiness) : null},
    ${data.stakeBusiness},
    ${JSON.stringify(data.sacramentHymn)},
    ${JSON.stringify(data.speakers)},
    ${JSON.stringify(data.closingHymn)},
    ${data.closingPrayer}
  )
  RETURNING *
`
  if (create.length === 0) throw new AppError('Failed to create meeting', 500, 500)
  const meeting = create[0]
  return meeting as SacramentMeeting
}

export async function updateMeeting(
  id: number,
  data: Partial<SacramentMeeting>
): Promise<SacramentMeeting> {

  const update = await sql`
    UPDATE sacrament_meetings.meetings
    SET
      date = ${data.date},
      meeting_type = ${data.meetingType},
      presiding = ${data.presiding},
      conducting = ${data.conducting},
      announcements = ${data.announcements},
      opening_hymn = ${JSON.stringify(data.openingHymn)},
      opening_prayer = ${data.openingPrayer},
      stake_business = ${data.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(data.sacramentHymn)},
      speakers = ${JSON.stringify(data.speakers)},
      closing_hymn = ${JSON.stringify(data.closingHymn)},
      closing_prayer = ${data.closingPrayer}
    WHERE id = ${id}
    RETURNING *
  `;
  if (update.length === 0) throw new AppError('Failed to create meeting', 500, 500)
  const meeting = update[0]
  return meeting as SacramentMeeting
}

export async function deleteMeeting(id: number): Promise<boolean> {

  const deleteRec = await sql`
  DELETE FROM sacrament_meetings.meetings
  WHERE id = ${id}
  RETURNING *`;

  if (deleteRec.length == 0) throw new AppError("Error on deleting this meeting", 500, 500);


  return true;
}