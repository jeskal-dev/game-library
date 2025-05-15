import Dexie from "dexie";
import { EntityContainer } from "./container";
import { Injectable } from "../di";

@Injectable()
export class DatabaseService extends Dexie {
  constructor() {
    super("game-library");
  }

  async initialize(): Promise<void> {
    const version = EntityContainer.instance.currentVersion;
    this.version(version).stores(EntityContainer.instance.schemas);
    console.log("Esquema actualizado:", EntityContainer.instance.schemas);
  }
}
