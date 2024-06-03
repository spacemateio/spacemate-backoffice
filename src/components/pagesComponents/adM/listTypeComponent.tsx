import { Button } from "@/components/ui/button";

const ListTypeComponent = ({
  listType,
  setListType,
}: {
  listType: string;
  setListType: (type: string) => void;
}) => {
  return (
    <>
      <Button
        variant={listType === "pending" ? "default" : "outline"}
        onClick={() => setListType("pending")}
      >
        Pending
      </Button>
      {"  "}
      <Button
        variant={listType === "approved" ? "default" : "outline"}
        onClick={() => setListType("approved")}
      >
        Approved
      </Button>
      {"  "}
      <Button
        variant={listType === "rejected" ? "default" : "outline"}
        onClick={() => setListType("rejected")}
      >
        Rejected
      </Button>
    </>
  );
};

export default ListTypeComponent;
