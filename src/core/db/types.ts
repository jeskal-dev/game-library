export type EntityOptions = {
  tableName?: string;
};

export type PrimaryKeyOptions = {
  autoIncremental: boolean;
};

export interface BaseEntity {
  id: number;
}
