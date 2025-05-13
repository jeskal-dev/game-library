import { inject, Injectable } from "@/core";
import Dexie from "dexie";
import { EntityService } from "./EntityService";

@Injectable()
export class DatabaseService {
  entities = inject(EntityService);
  database: Dexie;

  constructor() {
    this.database = new Dexie("games-favorites");
  }


   
}
