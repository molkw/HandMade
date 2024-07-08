import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Profile from '../assets/profile.png';
import SummaryApi from '../common/index';

const imageToBase64 = async (image) => {
  const reader = new FileReader();
  
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(image);
  });
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await imageToBase64(file);
      setData((prev) => ({
        ...prev,
        profilePic: imagePic
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      try {
        const dataResponse = await fetch(SummaryApi.SignUp.url, {
          method: SummaryApi.SignUp.method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        if (!dataResponse.ok) {
          throw new Error(`HTTP error! status: ${dataResponse.status}`);
        }

        const responseData = await dataResponse.json();
        console.log("data", responseData);
      } catch (error) {
        console.error("Error during sign up:", error);
      }
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div id='main-content'>
      <section id='sign-up'>
        <div className='login-container'>
          <form className='flex flex-col gap-6 p-4' onSubmit={handleSubmit}>
            <div className='form-header text-center mb-6'>
              <h1 className='typing-effect'>Sign-up</h1>
            </div>

            {/* Upload Photo Section */}
            <div className='mx-auto w-full max-w-sm bg-white p-5 rounded-lg shadow-lg relative'>
              <div className='w-24 h-24 mx-auto relative overflow-hidden rounded-full border-4 border-gray-300'>
                <img 
                  src={data.profilePic || Profile} 
                  alt='Profile' 
                  className='w-full h-full object-cover'
                />
                <div className='absolute bottom-0 left-0 w-full flex justify-center'>
                  <label className='w-full text-xs bg-opacity-80 bg-slate-200 py-1 cursor-pointer text-center rounded-b-md'>
                    <span className='block truncate'>Upload Photo</span>
                    <input 
                      type='file' 
                      onChange={handleUploadPic}
                      className='hidden'
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className='grid gap-4'>
              <div>
                <label>Name:</label>
                <div className='bg-slate-100 p-2 rounded-md'>
                  <input 
                    type='text' 
                    placeholder='Enter your name' 
                    name='name'
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    className='w-full outline-none bg-transparent rounded-md' 
                  />
                </div>
              </div>
              <div>
                <label>Email:</label>
                <div className='bg-slate-100 p-2 rounded-md'>
                  <input 
                    type='email' 
                    placeholder='Enter email' 
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    required
                    className='w-full outline-none bg-transparent rounded-md' 
                  />
                </div>
              </div>
              <div>
                <label>Password:</label>
                <div className='password-container relative'>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder='Enter password' 
                    name='password'
                    value={data.password}
                    onChange={handleOnChange}
                    required
                    className='password-input w-full p-2 rounded-md outline-none border border-gray-300' 
                  />
                  <span 
                    className='eye-icon absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600'
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div>
                <label>Confirm Password:</label>
                <div className='password-container relative'>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder='Enter confirm password' 
                    name='confirmPassword'
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    className='password-input w-full p-2 rounded-md outline-none border border-gray-300' 
                  />
                  <span 
                    className='eye-icon absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600'
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button 
              className='bg-green-800 hover:bg-green-900 text-white px-6 py-2 w-full max-w-[100px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
            >
              SignUp
            </button>

            <p className='form-footer text-center mt-4'>
              Already have an account? <Link to={"/login"} className='text-green-700 hover:underline'>Login</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
