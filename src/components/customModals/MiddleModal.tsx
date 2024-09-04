import { X } from "lucide-react"; // Icon for close button
import { ReactNode } from "react";
import { Button } from "../ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode; // Adding children prop
  title: string;
  size: "sm" | "md" | "lg";
}

const MiddleModal = ({
  isOpen,
  onClose,
  children,
  title,
  size,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: "111111" }}
    >
      <div
        className={`relative ${size === "sm" ? "w-4/12 h-2/6" : size === "md" ? "w-8/12 h-2/6" : "w-11/12 h-5/6"} p-8 bg-white rounded-lg overflow-auto`}
      >
        <div className="flex justify-between items-center p-4 border-b sticky top-0 z-10 bg-white">
          <h2 className="text-lg font-semibold">{title} Listing</h2>
          <div className="flex space-x-2">
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

export default MiddleModal;
