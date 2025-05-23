export type RAWGOrdering =
  | "name"
  | "released"
  | "added"
  | "created"
  | "updated"
  | "rating"
  | "metacritic";
export type Ordering = RAWGOrdering | `-${RAWGOrdering}`;
export interface RAWGGameRequest {
  page: number;
  page_size: number;
  search: string;
  genres: number[];
  tags: number[];
  publishers: number[];
  platforms: number[];
  ordering: Ordering;
}
