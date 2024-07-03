import { BlogModel } from "./BlogModel";

export interface responseType {
  payload: BlogModel[];
  maxCount: number;
}
