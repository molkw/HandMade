import React from 'react';
import Logo from './Logo';
import { IoMdSearch } from "react-icons/io";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="h-20 shadow-md flex items-center bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 w-full">
   <div>
    <Link to={"/"}>
    <Logo/>
    </Link>
    </div>
        <div className="flex items-center w-full max-w-xs">
          <input
            type="text"
            placeholder="search product here ...."
            className="w-full border border-gray-300 rounded-l-md pl-2 py-1 outline-none"
          />
          <div className="text-lg w-8 h-8 bg-green-800 flex items-center justify-center rounded-r-md">
            <IoMdSearch />
          </div>
        </div>
        <div className="flex items-center gap-7 relative">
          <div className="text-3xl cursor-pointer">
            <FaRegUserCircle />
          </div>
          <div className="text-2xl relative">
            <FaShoppingCart />
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-green-800 text-white w-5 h-5 rounded-full flex items-center justify-center">
              <p className="text-xs">0</p>
            </div>
          </div>

          <div>
            <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-green-800 hover:bg-green-900'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
