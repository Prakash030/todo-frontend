import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo, clearUserInfo } from '../Utils/userActions';
import { login, glogin } from '../Services';
import { useNavigate } from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google';



const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.userInfo);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleGoogleLoginSuccess = async (tokenResponse) => {

        const accessToken = tokenResponse.access_token;

        try {
            const response = await glogin(accessToken);
            console.log(response);
            if (response?.status) {
                dispatch(setUserInfo(response?.user));
                localStorage.setItem("todoToken", response?.token);
                toast.success(response?.message);
                navigate('/');
            } else {
                toast.error("User already exists");
            }

        } catch (error) {
            console.log(error);
            toast.error("Invalid credentials");
        }
    }
    const gloginnew = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

    const handleLogin = async() => {

        if (!email || !password) {
            return toast.error('Invalid credentials');
        }
        try {
            const response = await login(email, password);
            console.log(response);
            if (response?.status) {
                dispatch(setUserInfo(response?.user));
                localStorage.setItem("todoToken", response?.token);
                toast.success(response.message);
                navigate('/');
            } else {
                toast.error("Invalid credentials");
            }
        } catch (error) {
            toast.error("Invalid credentials");
        }
    }

    console.log(userInfo)
    return (
        <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#282D2D] px-5">

            <div
                className={`xl:max-w-3xl ${"bg-black"
                    }  w-full p-5 sm:p-10 rounded-md`}
            >
                <h1
                    className={`text-center text-xl sm:text-3xl font-semibold ${"text-white"
                        }`}
                >
                    Login to your account
                </h1>
                <div className="w-full mt-8">
                    <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                        <input
                            className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-[#302E30] text-white focus:border-white"
                                }`}
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="relative w-full">
                            <input
                                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${"bg-[#302E30] text-white focus:border-white"
                                    }`}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <button className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            onClick={handleLogin}
                        >
                            <span className="ml-3">Login</span>
                        </button>
                        <p className='text-center'>Or</p>
                        <button className="mt-1 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <span className="ml-3" onClick={()=>gloginnew()}>Login using Google</span>
                        </button>
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-[#E9522C] hover:text-gray-300"
                            >
                                Register
                            </Link>
                        </p>
                        
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login