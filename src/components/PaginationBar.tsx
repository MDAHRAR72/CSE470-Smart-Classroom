"use client";

import { ITEM_PER_PAGE } from "@/lib/settings";

const PaginationBar = ({ page, count }: { page: number; count: number }) => {
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {/*Array.from{{length:Math.ceil(count / ITEM_PER_PAGE)}}*/}
        <button className="px-2 rounded-sm bg-blue-100">1</button>
      </div>
      <button
        disabled
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationBar;
