import { Injectable, type Constructor } from "@/core";

@Injectable()
export class EntityService {
  private entities = new Map<string, string>();

  register<T>(entity: Constructor<T>) {
    const instance = new entity();

    const listFields = Object.getOwnPropertyNames(instance);
    const fields = `++${listFields.join(", ")}`;
    this.entities.set(entity.name, fields);
  }
}
