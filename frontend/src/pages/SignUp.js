import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../assets/profile.png';
import SummaryApi from '../common/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'; // Import validator library

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value) {
          newErrors.name = "Ce champ est requis.";
        } else if (!/^[A-Za-z]+( [A-Za-z]+)?$/.test(value) || value.length > 12) {
          newErrors.name = "Le nom doit contenir uniquement des lettres et ne pas dépasser 12 caractères, avec un seul espace autorisé.";
        } else {
          newErrors.name = "";
        }
        break;
      case 'email':
        if (!value) {
          newErrors.email = "Ce champ est requis.";
        } else if (!EMAIL_REGEX.test(value)) {
          newErrors.email = "Format d'email invalide. Exemple: prenom.nom@gmail.com ou prenom.nom@domain.fr";
        } else {
          newErrors.email = "";
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = "Ce champ est requis.";
        } else if (value.length > 8) {
          newErrors.password = "Le mot de passe ne doit pas dépasser 8 caractères.";
        } else {
          newErrors.password = "";
        }
        break;
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = "Ce champ est requis.";
        } else if (value !== data.password) {
          newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
        } else {
          newErrors.confirmPassword = "";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
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

  const handleRemovePic = () => {
    setData((prev) => ({
      ...prev,
      profilePic: ""
    }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = data;
    let valid = true;
    const newErrors = { name: "", email: "", password: "", confirmPassword: "" };

    if (!name) {
      newErrors.name = "Ce champ est requis.";
      valid = false;
    } else if (!/^[A-Za-z]+( [A-Za-z]+)?$/.test(name) || name.length > 12) {
      newErrors.name = "Le nom doit contenir uniquement des lettres et ne pas dépasser 12 caractères, avec un seul espace autorisé.";
      valid = false;
    }

    if (!email) {
      newErrors.email = "Ce champ est requis.";
      valid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Format d'email invalide. Exemple: prenom.nom@gmail.com ou prenom.nom@domain.fr";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Ce champ est requis.";
      valid = false;
    } else if (password.length > 8) {
      newErrors.password = "Le mot de passe ne doit pas dépasser 8 caractères.";
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Ce champ est requis.";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const dataResponse = await fetch(SummaryApi.SignUp.url, {
        method: SummaryApi.SignUp.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!dataResponse.ok) {
        const errorData = await dataResponse.json();
        toast.error(errorData.message || "Something went wrong.");
        return;
      }

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message || "Sign up successful!");
        setTimeout(() => navigate("/login"), 1000);
      } else if (dataApi.error) {
        toast.error(dataApi.message || "Sign up failed.");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error("An unexpected error occurred. Please try again.");
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
            <div className='relative mx-auto w-full max-w-sm bg-white p-5 rounded-lg shadow-lg'>
              <div className='relative w-24 h-24 mx-auto'>
                <div className='relative w-full h-full overflow-hidden rounded-full border-4 border-gray-300'>
                  <img
                    src={data.profilePic || Profile}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                </div>
                {/* Remove Photo Button */}
                {data.profilePic && (
                  <button
                    type='button'
                    className='absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-all z-30'
                    onClick={handleRemovePic}
                  >
                    <MdClose size={20} />
                  </button>
                )}
                {/* Upload Photo Label */}
                <div className='absolute bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 w-full flex justify-center'>
                  <label className='text-xs bg-opacity-80 bg-slate-200 py-1 cursor-pointer text-center rounded-b-md'>
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
                <div className={`bg-slate-100 p-2 rounded-md ${errors.name ? 'border border-red-500' : ''}`}>
                  <input
                    type='text'
                    placeholder='Enter your name'
                    name='name'
                    value={data.name}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className='w-full outline-none bg-transparent rounded-md'
                  />
                </div>
                {errors.name && <div className='text-red-500'>{errors.name}</div>}
              </div>
              <div>
                <label>Email:</label>
                <div className={`bg-slate-100 p-2 rounded-md ${errors.email ? 'border border-red-500' : ''}`}>
                  <input
                    type='email'
                    placeholder='Enter email'
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className='w-full outline-none bg-transparent rounded-md'
                  />
                </div>
                {errors.email && <div className='text-red-500'>{errors.email}</div>}
              </div>
              <div>
                <label>Password:</label>
                <div className={`bg-slate-100 p-2 rounded-md ${errors.password ? 'border border-red-500' : ''}`}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    name='password'
                    value={data.password}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className='w-full outline-none bg-transparent rounded-md'
                  />
                  <span
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && <div className='text-red-500'>{errors.password}</div>}
              </div>
              <div>
                <label>Confirm Password:</label>
                <div className={`bg-slate-100 p-2 rounded-md ${errors.confirmPassword ? 'border border-red-500' : ''}`}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm password'
                    name='confirmPassword'
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className='w-full outline-none bg-transparent rounded-md'
                  />
                  <span
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.confirmPassword && <div className='text-red-500'>{errors.confirmPassword}</div>}
              </div>
            </div>

            <div className='text-center'>
            <button
               type='submit'
             className='bg-green-800 hover:bg-green-900 text-white px-4 py-2 w-full max-w-[120px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
>
                 Sign Up
            </button>

            </div>

            <div className='text-center'>
              <p>Already have an account? <Link to='/login' className='text-green-800 hover:underline'>Login</Link></p>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
