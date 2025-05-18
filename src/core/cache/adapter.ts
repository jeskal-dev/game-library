import Dexie from "dexie";
import { Injectable } from "../di";

@Injectable()
export class CacheAdapter {
  db: Dexie;

  constructor() {
    this.db = new Dexie("QueryCacheDB");
    this.db.version(1).stores({
      queryCache: "&key, value, updateAt",
    });
  }

  async get(key: string) {
    const entry = await this.db.table("queryCache").get(key);
    return entry;
  }

  async set(key: string, value: any) {
    await this.db.table("queryCache").put({
      key,
      value,
      updatedAt: new Date().toISOString(),
    });
  }
  async remove(key: string) {
    await this.db.table("queryCache").delete(key);
  }
  async clear() {
    await this.db.table("queryCache").clear();
  }
}
