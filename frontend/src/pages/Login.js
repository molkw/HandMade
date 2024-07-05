import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div id='main-content'>
            <section id='login'>
                <div className='login-container'>
                    <form className='pt-4' onSubmit={handleSubmit}>
                        <div className='form-header'>
                            <h1 className='typing-effect'>Login</h1>
                        </div>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                    type='email' 
                                    placeholder='Enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' 
                                />
                            </div>
                        </div>
                        <div>
                            <label>Password:</label>
                            <div className='password-container'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='Enter password' 
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    className='password-input' 
                                />
                                <span 
                                    className='eye-icon'
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <Link 
                                to={"/forgot-password"} 
                                className='block w-fit ml-auto hover:underline hover:text-green-700'
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <button 
                            className='bg-green-800 hover:bg-green-900 text-white px-6 py-2 w-full max-w-[100px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
                        >
                            Login
                        </button>
                    </form>
                    <p className='form-footer'>
                        Don't have an account? <Link to={"/sign-up"} className='text-green-700 hover:underline'>Sign up</Link>
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Login;
