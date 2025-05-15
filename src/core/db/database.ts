import Dexie from "dexie";
import { EntityContainer } from "./container";
import { Injectable } from "../di";

@Injectable()
export class DatabaseService extends Dexie {
  constructor() {
    super("game-library");
    this._initializeSchema();
  }

  private _initializeSchema() {
    this.version(1).stores(EntityContainer.instance.getSchemas());
  }
}
