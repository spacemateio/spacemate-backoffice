export const Badge = ({
  text,
  bgColor,
  textColor = "black",
}: {
  text: string;
  bgColor: string;
  textColor?: string;
}) => {
  return (
    <div
      className="inline-block px-3 py-1 text-xs font-medium rounded-md mr-1"
      style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
    >
      {text}
    </div>
  );
};
