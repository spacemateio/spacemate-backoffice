import React from "react";
import * as Icons from "lucide-react";

interface IconDisplayProps {
  iconName: string; // We'll accept a string and validate it within the component
  addStyle?: string;
}

const IconDisplay: React.FC<IconDisplayProps> = ({ iconName, addStyle }) => {
  const Icon = Icons[iconName as keyof typeof Icons] as React.ComponentType<{
    className?: string;
  }>;

  if (!Icon) return <div>Invalid icon name</div>; // If the icon doesn't exist, return a fallback UI

  return <Icon className={`${addStyle} ? ${addStyle} : "h-5 w-5" `} />;
};

export default IconDisplay;
