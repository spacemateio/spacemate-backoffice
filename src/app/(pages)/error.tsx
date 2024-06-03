"use client";
import React from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return <div>Error: {error.message}</div>;
};
export default Error;
