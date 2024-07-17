import React from "react";
import { FaRegSadTear } from "react-icons/fa";

export default function EmptyList() {
  return (
    <div className="text-center h-96 items-center justify-center flex bg-white">
      <div>
        <FaRegSadTear size={60} className="text-teal-400" />
        <h3 className="mt-0">No Records Found</h3>
      </div>
    </div>
  );
}
