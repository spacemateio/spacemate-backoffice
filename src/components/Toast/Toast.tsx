// components/Toast.tsx
import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyle = (): string => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "info":
        return "bg-blue-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div
      className={`fixed bottom-5 right-5 p-4 rounded-md shadow-lg ${getToastStyle()}`}
    >
      {message}
    </div>
  );
};

export default Toast;
