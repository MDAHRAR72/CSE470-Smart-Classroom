import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="flex items-center justify-between p-4 rounded-bl-2xl rounded-tl-2xl bg-gradient-to-r from-amber-200 to-blue-500">
      {/*search bar*/}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-2xl ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="" width={20} height={20} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      {/*Welcome*/}
      <div className="flex items-center gap-5 justify-end w-full">
        <h2 className="hidden lg:block text-xl font-semibold text-gray-800 px-4 py-2">
          Welcome, John Doe
        </h2>
      </div>
      {/*avatar and icons*/}
      <div className="flex items-center gap-5 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" alt="" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs ">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-gray-500 text-right">
            {user?.publicMetadata?.role as string}
          </span>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
