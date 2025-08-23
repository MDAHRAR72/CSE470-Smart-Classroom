import React from "react";

const Announcements = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Announcements</h1>
        <span className="text-xs text-gray-300">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-amber-100 rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit amet</h2>
            <span className="text-xs text-gray-300 bg-white rounded-md px-1 py-1">
              24/08/2025
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-blue-100 rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit amet</h2>
            <span className="text-xs text-gray-300 bg-white rounded-md px-1 py-1">
              24/08/2025
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-amber-100 rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit amet</h2>
            <span className="text-xs text-gray-300 bg-white rounded-md px-1 py-1">
              24/08/2025
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
