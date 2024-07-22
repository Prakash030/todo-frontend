import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Login = () => {

    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
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
                        />
                        <div className="relative w-full">
                            <input
                                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${"bg-[#302E30] text-white focus:border-white"
                                    }`}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <button className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <span className="ml-3">Register</span>
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
                        <button className="mt-7 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <span className="ml-3">Login using Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login