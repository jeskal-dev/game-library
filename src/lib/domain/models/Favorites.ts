import { Entity } from "@/lib/decorators/entity";

@Entity()
export class Favorites {
  id?: string;
  name?: string;
  sync?: string;
}
