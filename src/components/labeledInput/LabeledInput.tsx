import { ChangeEvent } from "react";
import { Input } from "../ui/input";

interface LabeledInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string | number | undefined;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  disabled?: boolean;
}

export function LabeledInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
}: LabeledInputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="mt-1"
      />
    </div>
  );
}
