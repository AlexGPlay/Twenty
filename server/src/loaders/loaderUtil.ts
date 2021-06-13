import { BaseEntity } from "typeorm";

export async function obtainDataForClass<T extends BaseEntity>(
  entityClass: new () => T,
  ids: readonly number[]
): Promise<T[]> {
  const results = await entityClass.findByIds(ids as number[]);
  const idsToResults: Record<number, T> = {};
  results.forEach((result) => (idsToResults[result.id] = result));

  return ids.map((id) => idsToResults[id]);
}
