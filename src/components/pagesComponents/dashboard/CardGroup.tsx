import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  icon: React.ElementType;
  title: string;
  count: number | null;
  bgColor: string;
  iconColor: string;
  link: string;
  loading: boolean;
}

const Card: React.FC<CardProps> = ({
  icon: Icon,
  title,
  count,
  bgColor,
  iconColor,
  link,
  loading,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex items-center p-4 w-full ${bgColor}`}
      onClick={() => navigate(link)}
    >
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full ${iconColor}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="ml-4">
        <div className="text-sm font-semibold text-gray-700">{title}</div>
        <div className="text-xl font-semibold text-gray-800">
          {loading ? (
            <div className="animate-spin h-7 w-7 border-4 border-gray-300 border-t-transparent rounded-full"></div>
          ) : count !== null ? (
            count
          ) : (
            "N/A"
          )}
        </div>
      </div>
    </div>
  );
};

interface CardGroupProps {
  cardData: CardProps[];
}

const CardGroup: React.FC<CardGroupProps> = ({ cardData }) => {
  return (
    <div className="flex justify-between items-center">
      {cardData.map((card, index) => (
        <React.Fragment key={index}>
          <Card
            icon={card.icon}
            title={card.title}
            count={card.count}
            bgColor={card.bgColor}
            iconColor={card.iconColor}
            link={card.link}
            loading={card.loading}
          />
          <div className="mx-4"></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CardGroup;
