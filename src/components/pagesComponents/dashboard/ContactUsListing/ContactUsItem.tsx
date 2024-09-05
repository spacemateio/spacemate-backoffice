import { ContactUsModel } from "../../../../lib/features/models/ContactUs/ContactUsModel";

const ContactUsItem = ({ item }: { item: ContactUsModel }) => {
  const { name, surname, createdDate, message, title } = item;

  const getInitials = (name: string, surname: string) => {
    const nameInitial = name ? name[0].toLocaleUpperCase() : "";
    const surnameInitial = surname ? surname[0].toLocaleUpperCase() : "";
    return `${nameInitial}${surnameInitial}`;
  };
  const asd = (createdDate: string) => {
    const date = new Date(createdDate);
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return localDate.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow-xl">
      <div className="flex items-center mb-1">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
          {getInitials(name, surname)}
        </div>
        <div className="flex flex-row ml-2">
          <div className="font-semibold mr-2 text-sm">
            {name} {surname}
          </div>
          <div className="bg-gray-200 text-gray-700 px-1 flex items-center rounded text-xs">
            {asd(createdDate)}
          </div>
        </div>
      </div>
      <div className="w-full px-1 text-sm">{message ? message : title}</div>
    </div>
  );
};

export default ContactUsItem;
