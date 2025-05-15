import type { UpdateSpec } from "dexie";
import { inject, type Constructor } from "../di";
import { EntityContainer } from "./container";
import { DatabaseService } from "./database";
import type { BaseEntity } from "./types";

export class BaseRepository<T extends BaseEntity> {
  protected readonly db = inject(DatabaseService);
  private readonly tableName: string;

  constructor(entity: Constructor<T>) {
    const options = EntityContainer.instance.entityMetadata.get(entity);
    this.tableName = options?.tableName || entity.name;
  }

  get table() {
    return this.db.table<T>(this.tableName);
  }

  async getAll(): Promise<T[]> {
    return this.table.toArray();
  }

  async getById(id: number): Promise<T | undefined> {
    return this.table.get(id);
  }

  async create(item: Omit<T, "id">) {
    console.log({ item });
    return this.table.add(item as T);
  }

  async update(id: number, changes: UpdateSpec<T>): Promise<number> {
    return this.table.update(id, changes);
  }

  async delete(id: number): Promise<void> {
    return this.table.delete(id);
  }
}
