import React from "react";
import { useNavigate } from "react-router-dom";
import { AdModel } from "../../../lib/features/models/AdM/AdModel";
import IconDisplay from "../../iconComponent/IconDisplay";

interface SimpleTableProps {
  data: AdModel[];
}

const SimpleTable: React.FC<SimpleTableProps> = ({ data }) => {
  const navigate = useNavigate();

  // Metni 25 karakterden sonra kısaltan fonksiyon
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Butona tıklandığında yönlendirme fonksiyonu
  const handleViewDetails = (id: number) => {
    navigate(`/admin/listingManagement/${id}`);
  };

  return (
    <div className="mx-auto py-4">
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white border-separate border-spacing-0">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.email}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {truncateText(item.title, 25)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.price}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 flex items-center space-x-4">
                  <div onClick={() => handleViewDetails(item.id)}>
                    <IconDisplay iconName="Eye" />
                  </div>
                  <button
                    className="px-2 py-1 text-sm text-white bg-blue-500 rounded"
                    onClick={() => handleViewDetails(item.id)}
                  >
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimpleTable;
