const TabComponent = ({
  listType,
  setListType,
}: {
  listType: string;
  setListType: (type: string) => void;
}) => {
  const tabs = ["pending", "approved", "rejected"];

  return (
    <div className="w-full">
      <div className="relative border border-gray-300 rounded-lg shadow-sm p-1">
        <ul
          className="relative flex flex-wrap p-1 list-none rounded-lg bg-blue-gray-50/60"
          role="list"
        >
          <div
            className="absolute top-0 left-0 w-1/3 h-full bg-blue-500 rounded-lg transition-all duration-300 ease-in-out"
            style={{
              transform: `translateX(${tabs.indexOf(listType) * 100}%)`,
            }}
          />
          {tabs.map((tab) => (
            <li key={tab} className="z-30 flex-auto text-center">
              <button
                className={`relative z-40 flex items-center justify-center w-full px-4 py-2 mb-0 transition-all duration-300 ease-in-out border-0 rounded-lg cursor-pointer ${
                  listType === tab ? "text-white" : "text-slate-700"
                }`}
                onClick={() => setListType(tab)}
                role="tab"
                aria-selected={listType === tab}
              >
                <span className="ml-1 font-semibold text-sm">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TabComponent;
