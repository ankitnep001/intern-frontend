import { toast } from '@components/toast/ToastManages';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormProps } from '@interface/global.interface';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import encryptDecrypt from 'function/encryptDecrypt';
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'services/instance';

import * as yup from 'yup';

// validation schema from yup 
const validationSchema = yup.object({
    email: yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format'),
    password: yup.string().required("Password is required")
        .min(8, "Password length should be at least 8 characters")
        .max(16, "Password cannot exceed more than 16 characters")
});

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const { encrypt } = encryptDecrypt;

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormProps>({
        defaultValues: {
            email: "",
            password: ""
        },

        resolver: yupResolver(validationSchema)
    });


    const navigate = useNavigate();
    const onSubmit: SubmitHandler<LoginFormProps> = async (data) => {
        try {
            const response = await axiosInstance.post('/auth', {
                username: data.email,
                password: data.password,
            });
            const encrypted = encrypt(response.data.data.tokens.accessToken);

            if (rememberMe) {
                localStorage.setItem('accessTokenInternProject', encrypted as string);
            }
            else {
                sessionStorage.setItem('accessTokenInternProject', encrypted as string)
            }
            localStorage.setItem('FirstName', response.data.data.admin.details.firstName.en);
            toast.show({ title: "Success", content: "Login successfully", duration: 2000, type: 'success' });

            navigate('/admin', { replace: true });
            // console.log("data", response.data.data);
        } catch (error) {
            console.error('Error:', error);
            toast.show({ title: "Error", content: "Login unsuccessfully", duration: 2000, type: 'error' });
        }
    };

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    };
    //google login
    const signinWithGoogle = async (credentialResponse: CredentialResponse) => {
        try {
            const response = await axiosInstance.post('/auth/google', {
                googleId: credentialResponse?.credential
            })
            const encrypted = encryptDecrypt.encrypt(response?.data?.data?.tokens?.accessToken);
            localStorage.setItem('accessTokenInternProject', encrypted as string);
            toast.show({ title: "Success", content: "Login successfully", duration: 2000, type: 'success' });
            navigate('/admin', { replace: true });
        } catch (error) {
            console.log(error, 'error while login with google')
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center items-center h-[86vh]" noValidate>
            <div className="flex flex-col bg-[#fefeff] shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

                <div className="relative">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email<span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                        <MdOutlineEmail className="absolute left-3 text-gray-500" />
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                    </div>
                    {errors.email &&
                        <span className="text-red-500 text-sm mt-1">{errors.email?.message}</span>
                    }
                </div>

                <div className="relative mt-2">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password<span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                        <RiLockPasswordLine className="absolute left-3 text-gray-500" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            {...register("password")}
                            autoComplete="off"
                            placeholder="Enter your Password"
                            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                        <div className="absolute right-3 text-gray-500 cursor-pointer" onClick={handlePasswordToggle}>
                            {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
                        </div>
                    </div>
                    {errors.password &&
                        <span className="text-red-500 text-sm mt-1">{errors.password?.message}</span>
                    }
                </div>

                <div className="flex items-center gap-x-2 mt-4">
                    <label className="flex items-center text-gray-700 font-bold">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                        />
                        Remember Me
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-400 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4"
                >
                    Login
                </button>
                <div className='mt-2 self-center'>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            signinWithGoogle(credentialResponse)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
            </div>

        </form>
    );
};

export default LoginForm;
