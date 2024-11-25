import { ReservationModel } from "./ReservationModel";

export interface responseType {
  payload: ReservationModel[];
  maxCount: number;
}
