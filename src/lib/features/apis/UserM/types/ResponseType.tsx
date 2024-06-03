import { UserModel } from "./UserModel";

export interface responseType {
  payload: UserModel[];
  maxCount: number;
}
