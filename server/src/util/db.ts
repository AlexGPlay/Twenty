import { EntityManager, getConnection } from "typeorm"

export async function startTransaction<T>(f: ((em: EntityManager) => Promise<T>)) {
  const queryRunner = getConnection().createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try{
    const res = await f(queryRunner.manager);
    await queryRunner.commitTransaction();
    return res;
  }
  catch(e){
    await queryRunner.rollbackTransaction();
    throw e;
  }
  finally{
    await queryRunner.release();
  }
}