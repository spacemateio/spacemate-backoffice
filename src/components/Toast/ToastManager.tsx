import { forwardRef, useImperativeHandle, useState } from "react";
import "./toast.css";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

export interface ToastManagerRef {
  addToast: (message: string, type: Toast["type"]) => void;
}

const ToastManager = forwardRef<ToastManagerRef>((props, ref) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useImperativeHandle(ref, () => ({
    addToast(message, type) {
      if (message === null) {
        console.log(props);
      }
      const id = Date.now();
      setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        );
      }, 3000);
    },
  }));

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
});

export default ToastManager;
