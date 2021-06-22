import { getConnection } from "typeorm";

export async function getOnlineFriends(userId: number) {
  const qr = getConnection().createQueryRunner();
  const friends = await qr.query(`
    SELECT u.id, u.name, u.surname, u."profileImage"
    FROM public.user u 
    WHERE 
      u.id IN (SELECT f."friend2Id" FROM friendship f WHERE f."friend1Id" = ${userId}) AND 
      u.connected;
  `);
  await qr.release();
  return friends;
}
