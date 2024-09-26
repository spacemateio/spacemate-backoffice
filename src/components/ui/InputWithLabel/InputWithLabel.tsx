import React from "react";
import "./InputWithLabel.css";
import { cn } from "../../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showCount?: boolean; // Karakter sayısını gösterme seçeneği
  maxLength?: number; // Maksimum uzunluk
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, showCount, maxLength, ...props }, ref) => {
    const [value, setValue] = React.useState<string>(
      props.value?.toString() || ""
    );

    React.useEffect(() => {
      setValue(props.value?.toString() || "");
    }, [props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const characterCountStyle =
      maxLength && value.length >= maxLength ? "text-red-500" : "text-black";

    return (
      <>
        <div className="entryArea">
          <input
            className={cn("inputLabel", className)}
            type={type}
            required
            ref={ref}
            value={value}
            onChange={handleChange}
            maxLength={maxLength} // maxLength özelliği eklendi
            {...props}
          />
          <div className="labelLine">{label}</div>
        </div>
        {showCount && (
          <p
            className={`text-xs flex justify-end pr-2 pt-1 ${characterCountStyle}`}
          >
            {value.length}/{maxLength}
          </p>
        )}
      </>
    );
  }
);

export default InputWithLabel;
