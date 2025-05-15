import { type Constructor } from "../di";
import { EntityContainer } from "./container";
import type { EntityOptions, PrimaryKeyOptions } from "./types";

/**
 * Decorador de entidad con soporte para herencia
 */
export function Entity(options: EntityOptions = {}) {
  return (target: Constructor) => {
    const container = EntityContainer.instance;

    // Registrar metadatos
    container.entityMetadata.set(target, options);
    container.entities.add(target);
    container.registerEntitySchema(target, options);
  };
}

/**
 * Decorador de clave primaria con autoincremento opcional
 */
export function PrimaryKey(options?: PrimaryKeyOptions): PropertyDecorator {
  return (target, propertyKey) => {
    const constructor = target.constructor as Constructor;
    const keyName = propertyKey.toString();
    const primaryKey = options?.autoIncremental ? `++${keyName}` : keyName;

    EntityContainer.instance.primaryKeys.set(constructor, primaryKey);
  };
}

/**
 * Decorador de columna con registro de índices
 */
export function Column(): PropertyDecorator {
  return (target, propertyKey) => {
    const constructor = target.constructor as Constructor;
    const columnName = propertyKey.toString();

    const indexes =
      EntityContainer.instance.columns.get(constructor) || new Set();
    indexes.add(columnName);
    EntityContainer.instance.columns.set(constructor, indexes);
  };
}
