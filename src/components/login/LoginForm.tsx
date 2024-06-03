import { toast } from '@components/toast/ToastManages';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormProps } from '@interface/global.interface';
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from 'services/instance';
import * as yup from 'yup';

//validation from yup 
const validationSchema = yup.object({
    email: yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format'),
    password: yup.string().required("Password is required")
        .min(8, "Password length should be at least 8 characters")
        .max(16, "Password cannot exceed more than 16 characters")
})
const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

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
            localStorage.setItem('accessTokenInternProject', response.data.data.tokens.accessToken);
            toast.show({ title: "Success", content: "Login successfully", duration: 2000, type: 'success' });

            //replace true vayo vane 1 step back auxa 
            navigate('/admin', { replace: true });
        } catch (error) {
            console.error('Error:', error);
            toast.show({ title: "Error", content: "Login unsuccessfully", duration: 2000, type: 'error' });

        }
    };

    //show and hide password handler
    const handlePasswordToggle = () => {
        setShowPassword(!showPassword)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className=" flex justify-center items-center h-[86vh]" noValidate>
            <div className="flex flex-col bg-[#fefeff] shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

                <div className=" relative ">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email:
                    </label>
                    <div className="relative flex items-center">
                        <MdOutlineEmail className=" absolute left-3 text-gray-500 " />
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            placeholder="Enter your email"
                            className="w-full  pl-10 pr-3 py-2 border   rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                {errors.email &&
                    <span className="text-red-500 text-sm mt-1">{errors.email?.message}</span>
                }

                <div className="relative mt-2">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password:
                    </label>
                    <div className="relative flex items-center">
                        <RiLockPasswordLine className="absolute left-3 text-gray-500" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"

                            {...register("password")}
                            autoComplete="off"
                            placeholder="Enter your Password"
                            className="w-full  pl-10 pr-3 py-2 border   rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                        <div className=" absolute right-3 text-gray-500 cursor-pointer" onClick={handlePasswordToggle}>
                            {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
                        </div>
                    </div>
                </div>

                {errors.password &&
                    <span className="text-red-500 text-sm mt-1">{errors.password?.message}</span>
                }
                <button
                    type="submit"
                    className="w-full bg-blue-400 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-2"
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
