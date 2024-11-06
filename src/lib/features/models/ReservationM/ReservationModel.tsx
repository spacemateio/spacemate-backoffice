export enum ReservationStatus {
  CancelRequest = "CancelRequest",
  Active = "Active",
  Completed = "Completed",
}

export interface ReservationModel {
  id: number;
  renterId: number;
  hostId: number;
  renterEmail: string;
  canceledByName: string;
  canceledById: number;
  startDate: string; // Date tipinde kullanmayı düşünüyorsanız Date olarak güncelleyebilirsiniz
  endDate: string; // Date tipinde kullanmayı düşünüyorsanız Date olarak güncelleyebilirsiniz
  status: ReservationStatus;
  reservationDate: string | null; // Date tipinde kullanmayı düşünüyorsanız Date olarak güncelleyebilirsiniz
  cancelRequestDate: string | null; // Date tipinde kullanmayı düşünüyorsanız Date olarak güncelleyebilirsiniz
}
