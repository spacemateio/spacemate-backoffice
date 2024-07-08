import { Button } from "./ui/button";

const ListTypeComponent = ({
  listType,
  setListType,
}: {
  listType: string;
  setListType: (type: string) => void;
}) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={listType === "pending" ? "default" : "outline"}
        onClick={() => setListType("pending")}
      >
        Pending
      </Button>
      <Button
        variant={listType === "approved" ? "default" : "outline"}
        onClick={() => setListType("approved")}
      >
        Approved
      </Button>
      <Button
        variant={listType === "rejected" ? "default" : "outline"}
        onClick={() => setListType("rejected")}
      >
        Rejected
      </Button>
    </div>
  );
};

export default ListTypeComponent;
