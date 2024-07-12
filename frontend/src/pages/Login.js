import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 
import SummaryApi from '../common/index';
import { ToastContainer, toast } from 'react-toastify';
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate()
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const dataResponse = await fetch(SummaryApi.signIn.url, {
                method: SummaryApi.signIn.method,
                credentials: 'include', // Include credentials
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
    
            const dataApi = await dataResponse.json();
    
            if (dataApi.success) {
                toast.success(dataApi.message);
                // Delay navigation to ensure the toast is displayed
                setTimeout(() => {
                    navigate('/');
                }, 1000); // 2-second delay
            } else if (dataApi.error) {
                toast.error(dataApi.message);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            toast.error('An error occurred during login.');
        }
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
