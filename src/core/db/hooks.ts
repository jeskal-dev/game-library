import { inject, type Constructor } from "../di";
import type { BaseRepository } from "./repository";
import type { BaseEntity } from "./types";

export function useRepository<
  TEntity extends BaseEntity,
  TRepository extends BaseRepository<TEntity>,
  TConstructor extends Constructor<TRepository>
>(repository: TConstructor) {
  return inject(repository);
}
