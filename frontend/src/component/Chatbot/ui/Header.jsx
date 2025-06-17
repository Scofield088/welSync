import React from 'react';
import { HiOutlineShare, HiOutlineUser } from 'react-icons/hi2';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-white border-b">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">ChatGPT</h1>
        <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">Memory Full</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <HiOutlineShare className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <HiOutlineUser className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
