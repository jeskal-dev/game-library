import type { Constructor } from "../di";
import type { EntityOptions } from "./types";

export class EntityContainer {
  private static _instance: EntityContainer;

  static get instance() {
    if (!EntityContainer._instance)
      EntityContainer._instance = new EntityContainer();

    return EntityContainer._instance;
  }

  entities: Constructor[] = [];
  entityMetadata = new Map<Constructor, EntityOptions>();
  primaryKeys = new Map<Constructor, string>();
  indexes = new Map<Constructor, string[]>();

  registerEntity(entity: Constructor) {
    this.entities.push(entity);
  }

  getSchemas() {
    return this.entities.reduce((schema, entity) => {
      const options = this.entityMetadata.get(entity);
      const pk = this.primaryKeys.get(entity);
      const idx = this.resolveIndexes(entity);

      return {
        ...schema,
        [options?.tableName ?? entity.name]: pk
          ? [pk, ...idx].join(",")
          : "++id",
      };
    }, {} as Record<string, string>);
  }

  registerEntityMetadata<T>(token: Constructor<T>, options: EntityOptions) {
    this.entityMetadata.set(token, options);
  }

  registerPrimaryKey<T>(token: Constructor<T>, key: string) {
    this.primaryKeys.set(token, key);
  }

  registerIndex<T>(token: Constructor<T>, key: string) {
    const existing = this.resolveIndexes(token);
    const indexes = [...existing, key];
    this.indexes.set(token, indexes);
  }

  resolveIndexes<T>(token: Constructor<T>) {
    return this.indexes.get(token) ?? [];
  }
}
