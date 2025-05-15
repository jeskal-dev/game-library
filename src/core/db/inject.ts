import type { Constructor } from "../di";
import { BaseRepository } from "./repository";
import type { BaseEntity } from "./types"; 

export function repository<
  TEntity extends BaseEntity,
  TConstructor extends Constructor<TEntity>
>(entity: TConstructor) {
  return new BaseRepository(entity);
}
