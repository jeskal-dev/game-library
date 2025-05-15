import { Entity, Column, PrimaryKey, type BaseEntity } from "@/core/db";

@Entity({
  tableName: "users",
})
export class User implements BaseEntity {
  @PrimaryKey({ autoIncremental: true })
  id!: number;
  @Column()
  name!: string;
  @Column()
  email!: string;
}
