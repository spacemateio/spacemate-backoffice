export const Badge = ({
  text,
  bgColor,
  textColor = "black",
  fontSize = "text-xs", // Varsayılan font boyutu
  className = "", // Dinamik className
}: {
  text: string;
  bgColor: string;
  textColor?: string;
  fontSize?: string;
  className?: string; // Dinamik className için ekledik
}) => {
  return (
    <div
      className={`inline-block px-2 py-0.5 font-medium rounded-md mr-1 ${fontSize} ${className}`}
      style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
    >
      {text}
    </div>
  );
};
