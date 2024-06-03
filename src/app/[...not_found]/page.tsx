import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SpaceMate - 404",
};

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold">404</h1> <br />{" "}
        <p className="text-blue-500 hover:text-blue-700 text-lg font-semibold">
          <Link href="/dashboard">Return Home</Link>{" "}
        </p>
      </div>
    </div>
  );
}
