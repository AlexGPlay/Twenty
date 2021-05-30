import { getConnection } from 'typeorm';

export async function findCalendarEvts(userId: number): Promise<{
  id: number;
  name: string;
  surname: string;
  next_birthday: Date;
  days_until_next_birthday: number;
  group: number;
}[]>{
  const qr = getConnection().createQueryRunner();
  const birthdays = await qr.query(`
    WITH birthdays AS (
      SELECT 
        u."id", 
        u."name", 
        u."surname",
        (CASE 
          WHEN EXTRACT(month FROM AGE(u."birthday"::date)) = 0 AND EXTRACT(day FROM AGE(u."birthday"::date)) = 0 THEN date'today'
          ELSE CAST(u."birthday" + ((EXTRACT(year FROM AGE(u."birthday")) + 1) * interval '1' year) as date)
        END) AS next_birthday,
        (CASE 
          WHEN EXTRACT(month FROM AGE(u."birthday"::date)) = 0 AND EXTRACT(day FROM AGE(u."birthday"::date)) = 0 THEN date'today'
          ELSE CAST(u."birthday" + ((EXTRACT(year FROM AGE(u."birthday")) + 1) * interval '1' year) as date)
        END) - date'today' as days_until_next_birthday
      FROM public."user" u
      INNER JOIN public."friendship" f ON u.id = f."friend2Id"
      WHERE f."friend1Id" = ${userId}
    )
    (SELECT *, 0 AS "group" FROM birthdays WHERE days_until_next_birthday = 0)
    UNION
    (SELECT *, 1 AS "group" FROM birthdays WHERE days_until_next_birthday = 1)
    UNION
    (SELECT *, 2 AS "group" FROM birthdays WHERE days_until_next_birthday > 1 AND days_until_next_birthday <= 7)
    UNION
    (SELECT *, 3 AS "group" FROM birthdays WHERE days_until_next_birthday > 7 order by days_until_next_birthday LIMIT 5)
    ORDER BY days_until_next_birthday ASC  
  `);
  await qr.release();
  return birthdays;
}