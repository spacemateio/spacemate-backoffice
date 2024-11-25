import { useEffect, useState } from "react";
import { LabeledInput } from "../../labeledInput/LabeledInput";
import {
  ReservationModel,
  ReservationStatus,
  statusColors,
  statusText,
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
    renterName: "",
    renterEmail: "",
    hostId: 0,
    hostName: "",
    hostEmail: "",
    listingId: 0,
    canceledByName: "",
    canceledById: 0,
    startDate: new Date(),
    endDate: new Date(),
    status: ReservationStatus.Active,
    reservationDate: null,
    cancelRequestDate: null,
    declineDateTime: null,
  });

  const { bgColor, textColor } =
    statusColors[formData.status] || statusColors[ReservationStatus.Active];

  // İptal eden kişiyi belirleme
  const getCancelStatus = () => {
    const { hostId, canceledById, renterId } = formData;

    if (hostId === canceledById) {
      return "Canceled by host";
    } else if (renterId === canceledById) {
      return "Canceled by renter";
    } else {
      return "Not canceled"; // İptal edilmemişse başka bir şey yazabilirsiniz
    }
  };

  useEffect(() => {
    if (isShow && initialData) {
      setFormData({
        ...initialData,
        startDate: new Date(initialData.startDate),
        endDate: new Date(initialData.endDate),
        reservationDate: initialData.reservationDate
          ? new Date(initialData.reservationDate)
          : null,
        cancelRequestDate: initialData.cancelRequestDate
          ? new Date(initialData.cancelRequestDate)
          : null,
        declineDateTime: initialData.declineDateTime
          ? new Date(initialData.declineDateTime)
          : null,
      });
    }
  }, [isShow, initialData]);

  return (
    <div className="space-y-6">
      {/* Status ve Cancellation Status - Yan yana yerleştirme */}
      <div className="flex gap-6 items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Status</span>
          <Badge
            text={statusText[formData.status]}
            bgColor={bgColor}
            textColor={textColor}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Cancellation Status</span>
          <p className="text-sm font-medium text-gray-700">
            <span className="font-semibold">{getCancelStatus()}</span>
          </p>
        </div>
      </div>

      {/* Reservation and Listing IDs */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <LabeledInput
            label="Reservation ID"
            name="id"
            value={formData.id.toString()}
            onChange={() => {}}
            disabled={isShow}
          />
        </div>
        <div className="w-1/2">
          <LabeledInput
            label="Listing ID"
            name="listingId"
            value={formData.listingId.toString()}
            onChange={() => {}}
            disabled={isShow}
          />
        </div>
      </div>

      {/* User Information */}
      <div className="grid grid-cols-2 gap-4">
        <h3 className="text-lg font-semibold col-span-2">User Information</h3>
        <LabeledInput
          label="Renter Name"
          name="renterName"
          value={formData.renterName}
          onChange={() => {}}
          disabled={isShow}
        />
        <LabeledInput
          label="Renter Email"
          name="renterEmail"
          value={formData.renterEmail}
          onChange={() => {}}
          disabled={isShow}
        />
        <LabeledInput
          label="Host Name"
          name="hostName"
          value={formData.hostName}
          onChange={() => {}}
          disabled={isShow}
        />
        <LabeledInput
          label="Host Email"
          name="hostEmail"
          value={formData.hostEmail}
          onChange={() => {}}
          disabled={isShow}
        />
      </div>

      {/* Cancellation Information */}
      <div className="grid grid-cols-2 gap-4">
        <h3 className="text-lg font-semibold col-span-2">
          Cancellation Details
        </h3>
        <LabeledInput
          label="Canceled By Name"
          name="canceledByName"
          value={formData.canceledByName}
          onChange={() => {}}
          disabled={isShow}
        />
        <LabeledInput
          label="Canceled By ID"
          name="canceledById"
          value={formData.canceledById.toString()}
          onChange={() => {}}
          disabled={isShow}
        />
      </div>

      {/* Date Information */}
      <div className="grid grid-cols-2 gap-4">
        <h3 className="text-lg font-semibold col-span-2">Date Information</h3>
        <LabeledInput
          label="Start Date"
          name="startDate"
          value={formData.startDate.toDateString()}
          onChange={() => {}}
          disabled={isShow}
        />
        <LabeledInput
          label="End Date"
          name="endDate"
          value={formData.endDate.toDateString()}
          onChange={() => {}}
          disabled={isShow}
        />
        <LabeledInput
          label="Decline Date"
          name="declineDateTime"
          value={formData.declineDateTime?.toDateString() || ""}
          onChange={() => {}}
          disabled={isShow}
        />
        <LabeledInput
          label="Reservation Date"
          name="reservationDate"
          value={formData.reservationDate?.toDateString() || ""}
          onChange={() => {}}
          disabled={isShow}
        />
        <LabeledInput
          label="Cancel Request Date"
          name="cancelRequestDate"
          value={formData.cancelRequestDate?.toDateString() || ""}
          onChange={() => {}}
          disabled={isShow}
        />
      </div>
    </div>
  );
}
