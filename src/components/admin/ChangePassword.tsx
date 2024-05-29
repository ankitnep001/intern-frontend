import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordProps } from "@interface/global.interface";
import { axiosInstance } from "@services/instance";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

//validation from yup
const validationSchema = yup.object({
    oldPassword: yup.string().required("oldPassword is required"),
    newPassword: yup.string().required("Password is required")
        .min(8, "Password length should be at least 8 characters")
        .max(16, "Password cannot exceed more than 16 characters")
})
const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordProps>({
        defaultValues: {
            oldPassword: "",
            newPassword: ""
        },
        resolver: yupResolver(validationSchema)
    });

    const navigate = useNavigate();
    const onSubmit: SubmitHandler<ChangePasswordProps> = (data) => {

        axiosInstance({
            method: 'patch',
            url: '/auth/update-password',

            data: {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            }
        }).then((response) => {
            // console.log(response);

            localStorage.removeItem('accessTokenInternProject');
            navigate('/login')
            console.log(response);
        })
            .catch(error => console.log(error));
    };

    //show and hide password handler
    const handlePasswordToggle = () => {
        setShowPassword(!showPassword)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className=" w-full flex justify-center items-center h-screen" noValidate>
            <div className="flex flex-col bg-[#fefeff] shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-center text-2xl font-bold mb-4">Change Password</h2>

                <div className=" relative">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Old Password:
                    </label>
                    <div className="relative flex items-center">
                        <RiLockPasswordLine className="absolute left-3 text-gray-500" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="oldpassword"
                            {...register("oldPassword")}
                            autoComplete="off"
                            placeholder="Your old Password"
                            className="w-full  pl-10 pr-3 py-2 border   rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                        <div className=" absolute right-3 text-gray-500 cursor-pointer" onClick={handlePasswordToggle}>
                            {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
                        </div>
                    </div>

                </div>
                {errors.oldPassword &&
                    <span className="text-red-500 text-sm mt-1">{errors.oldPassword?.message}</span>
                }


                <div className="relative mt-2">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password:
                    </label>
                    <div className="relative flex items-center">
                        <RiLockPasswordLine className="absolute left-3 text-gray-500" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="newpassword"
                            {...register("newPassword")}
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
                {errors.newPassword &&
                    <span className="text-red-500 text-sm mt-1">{errors.newPassword?.message}</span>
                }

                <button
                    type="submit"
                    className="w-full bg-blue-400 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-2"
                >
                    Change
                </button>
            </div>
        </form>
    )
}

export default ChangePassword