import React from "react";
import * as Icons from "lucide-react";
import { Icon as IconType } from "lucide-react"; // Icon tipini import ediyoruz

interface IconDisplayProps {
  iconName: keyof typeof Icons; // 'Icons' içindeki anahtar türlerinden birini alır
}

const IconDisplay: React.FC<IconDisplayProps> = ({ iconName }) => {
  const Icon = Icons[iconName] as IconType; // İkonu doğru tip olarak alıyoruz
  if (!Icon) return null; // Eğer ikon bulunamazsa null döndür

  return <Icon className="h-5 w-5" />;
};

export default IconDisplay;
