"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { FaUser } from "react-icons/fa";

interface UserDropdownProps {
  userName: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ userName }) => {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div className="flex items-center relative text-left">
      <div className="flex items-center space-x-2 text-epg-light-black dark:text-white">
        <span style={{ fontSize: "17px" }} className="font-semibold font-poppins">
          {userName}
        </span>
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <FaUser className="text-gray-600" size={20} />
        </button>
      </div>

      {openPopover && (
        <div className="w-full rounded-md bg-white p-2 mt-2 absolute left-0 shadow-md">
          <button
            className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          >
            <p className="text-sm text-epg-light-black font-poppins">Logout</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
