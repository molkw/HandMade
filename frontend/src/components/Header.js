import React from 'react';
import Logo from './Logo';
import { IoMdSearch } from "react-icons/io";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="h-20 shadow-md flex items-center bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 w-full">
        <div className="flex items-center">
          <Link to={"/"}>
            <Logo />
          </Link>
          <div className="ml-6">
            <h1 className="text-5xl font-extrabold text-gray-800" style={{ fontFamily: 'Amiri, serif' }}> {/* Increased font size */}
              Handmade
            </h1>
            <p className="text-sm font-bold text-green-800" style={{ fontFamily: 'Amiri, serif' }}> {/* Adjusted text size and weight */}
              by Lamia
            </p>
          </div>
        </div>
        <div className="flex items-center w-full max-w-xs">
          <input
            type="text"
            placeholder="search product here ...."
            className="w-full border border-gray-300 rounded-full pl-4 py-2 outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
          />
          <div className="bg-green-800 text-white w-12 h-12 flex items-center justify-center rounded-full ml-[-2.5rem] hover:bg-green-700 transition duration-150 ease-in-out">
            <IoMdSearch />
          </div>
        </div>
        <div className="flex items-center gap-7 relative">
          <div className="text-3xl cursor-pointer">
            <FaRegUserCircle />
          </div>
          <div className="text-2xl relative  cursor-pointer hover:text-green-800 transition-colors">
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
