import { X } from "lucide-react"; // Icon for close button
import { ReactNode } from "react";
import { Button } from "../ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTogglePosition: () => void;
  isCentered: boolean;
  children: ReactNode; // Adding children prop
  title: string;
}

const CustomModal = ({
  isOpen,
  onClose,
  onTogglePosition,
  isCentered,
  children,
  title,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}
    >
      <div
        className={`fixed ${isCentered ? "top-20 bottom-20 left-1/2 transform -translate-x-1/2 w-2/5" : "top-0 bottom-0 right-0 w-2/5"} bg-white shadow-lg rounded-lg md:h-auto overflow-y-auto`}
      >
        <div className="flex justify-between items-center p-4 border-b sticky top-0 z-10 bg-white">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onTogglePosition}>
              Toggle Position
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
