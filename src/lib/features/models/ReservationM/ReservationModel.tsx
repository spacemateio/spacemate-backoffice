export enum ReservationStatus {
  CancelRequest = "CancelRequest",
  Active = "Active",
  Completed = "Completed",
  Canceled = "Canceled",
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

// Renklerin tanımlandığı nesne
export const statusColors = {
  [ReservationStatus.Active]: {
    bgColor: "#FEF3C7", // Sarı
    textColor: "#92400E", // Koyu sarı
  },
  [ReservationStatus.CancelRequest]: {
    bgColor: "#FECACA", // Kırmızı
    textColor: "#B91C1C", // Koyu kırmızı
  },
  [ReservationStatus.Completed]: {
    bgColor: "#DBEAFE",
    textColor: "#1E3A8A",
  }, // Mavi
  [ReservationStatus.Canceled]: {
    bgColor: "#D1FAE5",
    textColor: "#065F46",
  }, // Yeşil
};

// Enum değerlerini anlaşılır bir metne dönüştür
export const statusText = {
  [ReservationStatus.Active]: "Active",
  [ReservationStatus.CancelRequest]: "Cancel Request",
  [ReservationStatus.Completed]: "Completed",
  [ReservationStatus.Canceled]: "Canceled",
};
