import type { BaseModel } from "../common/Model";

export interface Tag extends BaseModel {
  name: string;
  slug: string;
  image_background: string;
  language: string;
}
