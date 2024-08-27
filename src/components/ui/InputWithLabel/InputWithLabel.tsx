import React from "react";
import "./InputWithLabel.css";
import { cn } from "../../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="entryArea">
        <input
          className={cn("inputLabel", className)}
          type={type}
          required
          ref={ref}
          {...props}
        />
        <div className="labelLine">{label}</div>
      </div>
    );
  }
);

export default InputWithLabel;
