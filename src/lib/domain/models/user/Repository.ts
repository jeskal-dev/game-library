import { Injectable } from "@/core";
import { BaseRepository } from "@/core/db";
import { User } from "./Model";

@Injectable()
export class UserRepository extends BaseRepository<User> {

  constructor() {
    super(User)
  }

}
