import { useEffect, useState } from "react";
import { ContactUsModel } from "../../../lib/features/models/ContactUs/ContactUsModel";
import { LabeledInput } from "../../labeledInput/LabeledInput";
import { Textarea } from "../../ui/textarea";

interface ContactUsFormProps {
  isShow: boolean;
  initialData?: ContactUsModel;
}

export default function ContactUsForm({
  isShow,
  initialData,
}: ContactUsFormProps) {
  const [formData, setFormData] = useState<ContactUsModel>({
    id: 0,
    userId: 0,
    name: "",
    surname: "",
    email: "",
    mobile: "",
    title: "",
    message: "",
    location: "",
    status: 0,
    createdDate: "",
  });

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
                label="Id"
                name="id"
                value={formData.id ?? ""}
                onChange={() => {}}
                disabled={isShow}
              />
            </div>
            <div className="w-1/2">
              <LabeledInput
                label="User ID"
                name="userId"
                value={formData.userId ?? ""}
                onChange={() => {}}
                disabled={isShow}
              />
            </div>
          </div>{" "}
          <div className="flex gap-4">
            <div className="w-1/2">
              <LabeledInput
                label="Name"
                name="name"
                value={formData.name ?? ""}
                onChange={() => {}}
                disabled={isShow}
              />
            </div>
            <div className="w-1/2">
              <LabeledInput
                label="Surname"
                name="surname"
                value={formData.surname ?? ""}
                onChange={() => {}}
                disabled={isShow}
              />
            </div>
          </div>
          <LabeledInput
            label="Email"
            name="email"
            value={formData.email ?? ""}
            onChange={() => {}}
            disabled={isShow}
          />
          <LabeledInput
            label="Mobile"
            name="mobile"
            value={formData.mobile ?? ""}
            onChange={() => {}}
            disabled={isShow}
          />
          <LabeledInput
            label="Title"
            name="title"
            value={formData.title ?? ""}
            onChange={() => {}}
            disabled={isShow}
          />
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <Textarea
            name="message"
            value={formData.message ?? ""}
            onChange={() => {}}
            disabled={isShow}
          />
          <LabeledInput
            label="Location"
            name="location"
            value={formData.location ?? ""}
            onChange={() => {}}
            disabled={isShow}
          />
          <LabeledInput
            label="Status"
            name="status"
            value={formData.status ?? ""}
            onChange={() => {}}
            disabled={isShow}
          />
          <LabeledInput
            label="Created Date"
            name="createdDat"
            value={formData.createdDate ?? ""}
            onChange={() => {}}
            disabled={isShow}
          />
        </div>
      </div>
    </div>
  );
}
