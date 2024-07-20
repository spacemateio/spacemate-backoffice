// src/components/Toast/ToastProvider.tsx
import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useEffect,
} from "react";
import ToastManager, { ToastManagerRef } from "./ToastManager";
import { setToastManager } from "../../lib/features/apis/BlogM/blogApiHelper";

const ToastContext = createContext<ToastManagerRef | null>(null);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const toastManagerRef = useRef<ToastManagerRef>(null);

  useEffect(() => {
    if (toastManagerRef.current) {
      setToastManager(toastManagerRef.current);
    }
  }, []);

  return (
    <ToastContext.Provider value={toastManagerRef.current}>
      {children}
      <ToastManager ref={toastManagerRef} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
