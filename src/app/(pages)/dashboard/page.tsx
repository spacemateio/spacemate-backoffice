import { SomethingWentWrong } from "@/lib/exceptions";
import React from "react";

const Dashboard = () => {
  /*if (true) {
    throw new SomethingWentWrong(); //throw new Error("hayda");
  }*/
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Dashboard
    </div>
  );
};

export default Dashboard;
