import { useToast } from "./ToastContext";
import "./toast.css";
import {
  CheckIcon,
  CrossCircledIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

const ToastManager = () => {
  const { toasts } = useToast();

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckIcon className="toast-icon" />;
      case "error":
        return <CrossCircledIcon className="toast-icon" />;
      case "info":
        return <InfoCircledIcon className="toast-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          {getIcon(toast.type)}
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastManager;
