export type RAWGOrdering =
  | "name"
  | "released"
  | "added"
  | "created"
  | "updated"
  | "rating"
  | "metacritic";
export type Ordering = RAWGOrdering | `-${RAWGOrdering}`;

export interface RAWGPageRequest {
  page: number;
  page_size: number;
}

export interface RAWGGameRequest extends RAWGPageRequest {
  search: string;
  genres: number[];
  tags: number[];
  publishers: number[];
  platforms: number[];
  ordering: Ordering;
}
