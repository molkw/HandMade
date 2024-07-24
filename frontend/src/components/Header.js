import React, { useState } from 'react';
import Logo from './Logo';
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCircleUser } from 'react-icons/fa6';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import { toast } from 'react-toastify';
import ROLE from '../common/role';
const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <header className="h-20 shadow-md flex items-center bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 w-full">
        <div className="flex items-center">
          <Link to={"/"}>
            <Logo />
          </Link>
          <div className="ml-6">
            <h1 className="text-5xl font-extrabold text-gray-800" style={{ fontFamily: 'Amiri, serif' }}>
              Handmade
            </h1>
            <p className="text-sm font-bold text-green-800" style={{ fontFamily: 'Amiri, serif' }}>
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

        <div className="flex items-center gap-7">
          <div className='relative flex justify-center'>
            {
              user?.id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                    ) : (
                      <FaRegCircleUser/>
                    )
                  }
                </div>
              )
            }

            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>
                          Admin Panel
                        </Link>
                      )
                    }
                  </nav>
                </div>
              )
            }
          </div>

          <div className="text-2xl relative cursor-pointer hover:text-green-800 transition-colors">
            <FaShoppingCart />
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-green-800 text-white w-5 h-5 rounded-full flex items-center justify-center">
              <p className="text-xs">0</p>
            </div>
          </div>
          <div>
            {
              user?.id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
              ) : (
                <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-green-800 hover:bg-green-800'>Login</Link>
              )
            }
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
