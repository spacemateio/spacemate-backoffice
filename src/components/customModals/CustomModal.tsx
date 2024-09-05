import { ReactNode } from "react";
import { Button } from "../ui/button";
import IconDisplay from "../iconComponent/IconDisplay";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTogglePosition?: () => void;
  isCentered?: boolean;
  children: ReactNode;
  title: string;
  positionInfo?: boolean;
}

const CustomModal = ({
  isOpen,
  onClose,
  onTogglePosition,
  isCentered,
  children,
  title,
  positionInfo = true,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}
      style={{ zIndex: "111111" }}
    >
      <div
        className={`fixed ${isCentered ? "top-20 bottom-20 left-1/2 transform -translate-x-1/2 w-1/3" : "top-0 bottom-0 right-0 w-1/3"} bg-white shadow-lg rounded-lg md:h-auto overflow-y-auto`}
      >
        <div className="flex justify-between items-center px-4 py-2 border-b sticky top-0 z-10 bg-white">
          <h2 className="text-lg font-semibold">{title}</h2>

          <div className="flex space-x-2">
            {positionInfo && (
              <Button variant="outline" onClick={onTogglePosition}>
                Toggle Position
              </Button>
            )}
            <Button variant="ghost" onClick={onClose}>
              <IconDisplay iconName="X" />
            </Button>
          </div>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
