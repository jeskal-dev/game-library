import type { Constructor } from "../di";
import { EntityContainer } from "./container";
import type { EntityOptions, PrimaryKeyOptions } from "./types";

export function Entity(options: EntityOptions = {}) {
  return (target: Constructor) => {
    EntityContainer.instance.registerEntityMetadata(target, options);
  };
}

export function PrimaryKey(
  option: PrimaryKeyOptions = {
    autoIncremental: false,
  }
): PropertyDecorator {
  return (target, key) => {
    const constructor = target.constructor as Constructor;
    const keyName = key.toString();
    const primaryKey = option.autoIncremental ? `++${keyName}` : keyName;
    EntityContainer.instance.registerPrimaryKey(constructor, primaryKey);
  };
}

export function Index(): PropertyDecorator {
  return (target, key) => {
    const constructor = target.constructor as Constructor;
    EntityContainer.instance.registerIndex(constructor, key.toString());
  };
}
