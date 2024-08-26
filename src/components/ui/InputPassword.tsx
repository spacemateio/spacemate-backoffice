import React, { useState } from "react";
import { cn } from "../../lib/utils"; // Assuming you have a utility for class names
import IconDisplay from "../iconComponent/IconDisplay";

interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : "password"}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {isPasswordVisible ? (
            <IconDisplay iconName="EyeIcon" />
          ) : (
            <IconDisplay iconName="EyeOffIcon" />
          )}
        </button>
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
