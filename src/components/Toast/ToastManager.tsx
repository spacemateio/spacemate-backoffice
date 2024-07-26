import { useToast } from "./ToastContext";
import "./toast.css";

const ToastManager = () => {
  const { toasts } = useToast();

  return (
    <div className="toast-container">
      {toasts.map((toast, index) => (
        <div key={index} className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastManager;
