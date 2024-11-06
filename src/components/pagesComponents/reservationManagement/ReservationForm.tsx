import { useEffect, useState } from "react";
import { LabeledInput } from "../../labeledInput/LabeledInput";
import {
  ReservationModel,
  ReservationStatus,
} from "../../../lib/features/models/ReservationM/ReservationModel";
import { Badge } from "../../ui/badge";

interface ReservationFormProps {
  isShow: boolean;
  initialData?: ReservationModel;
}

export default function ReservationForm({
  isShow,
  initialData,
}: ReservationFormProps) {
  const [formData, setFormData] = useState<ReservationModel>({
    id: 0,
    renterId: 0,
    hostId: 0,
    renterEmail: "",
    canceledByName: "",
    canceledById: 0,
    startDate: "",
    endDate: "",
    status: ReservationStatus.Active,
    reservationDate: null,
    cancelRequestDate: null,
  });

  // Renklerin tanımlandığı nesne
  const statusColors = {
    [ReservationStatus.Active]: {
      bgColor: "#FEF3C7", // Sarı
      textColor: "#92400E", // Koyu sarı
    },
    [ReservationStatus.CancelRequest]: {
      bgColor: "#FECACA", // Kırmızı
      textColor: "#B91C1C", // Koyu kırmızı
    },
    [ReservationStatus.Completed]: {
      bgColor: "#D1FAE5", // Yeşil
      textColor: "#065F46", // Koyu yeşil
    },
  };
  const { bgColor, textColor } =
    statusColors[formData.status] || statusColors[ReservationStatus.Active];

  useEffect(() => {
    if (isShow && initialData) {
      setFormData(initialData);
    }
  }, [isShow, initialData]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <LabeledInput
                label="ID"
                name="id"
                value={formData.id.toString()}
                onChange={() => {}}
                disabled={isShow}
              />
            </div>
            <div className="w-1/2">
              <LabeledInput
                label="Renter ID"
                name="renterId"
                value={formData.renterId.toString()}
                onChange={() => {}}
                disabled={isShow}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <LabeledInput
                label="Host ID"
                name="hostId"
                value={formData.hostId.toString()}
                onChange={() => {}}
                disabled={isShow}
              />
            </div>
            <div className="w-1/2">
              <LabeledInput
                label="Canceled By ID"
                name="canceledById"
                value={formData.canceledById.toString()}
                onChange={() => {}}
                disabled={isShow}
              />
            </div>
          </div>
          <LabeledInput
            label="Renter Email"
            name="renterEmail"
            value={formData.renterEmail ?? ""}
            onChange={() => {}}
            disabled={isShow}
          />
          <LabeledInput
            label="Canceled By Name"
            name="canceledByName"
            value={formData.canceledByName ?? ""}
            onChange={() => {}}
            disabled={isShow}
          />
          <LabeledInput
            label="Start Date"
            name="startDate"
            value={formData.startDate ?? ""}
            onChange={() => {}}
            disabled={isShow}
          />
          <LabeledInput
            label="End Date"
            name="endDate"
            value={formData.endDate ?? ""}
            onChange={() => {}}
            disabled={isShow}
          />
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <Badge
              text={formData.status}
              bgColor={bgColor} // Dinamik bgColor
              textColor={textColor} // Dinamik textColor
            />
          </div>

          <LabeledInput
            label="Reservation Date"
            name="reservationDate"
            value={formData.reservationDate ?? ""}
            onChange={() => {}}
            disabled={isShow}
          />
          <LabeledInput
            label="Cancel Request Date"
            name="cancelRequestDate"
            value={formData.cancelRequestDate ?? ""}
            onChange={() => {}}
            disabled={isShow}
          />
        </div>
      </div>
    </div>
  );
}
