import { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { instance } from "services/instance";

const LoginForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [_getData, setGetData] = useState<any>([]);

    //handle email change
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };

    //handle password change
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    //handle Submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("email:", email);
        console.log("password:", password);

        setEmail("");
        setPassword("");
    }

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        instance({
            method: 'post',
            url: '/auth',
            data: {
                username: email,
                password: password
            }
        }).then((response) => {
            setGetData(response.data);
            console.log(response)
        })
            .catch(error => console.log(error));
    }

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center h-[86vh]">
            <div className="flex flex-col bg-[#fefeff] shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

                <div className=" relative mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email:
                    </label>
                    <div className="relative flex items-center">
                        <MdOutlineEmail className=" absolute left-3 text-gray-500 " />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            className="w-full  pl-10 pr-3 py-2 border   rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="relative  mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password:
                    </label>
                    <div className="relative flex items-center">
                        <RiLockPasswordLine className="absolute left-3 text-gray-500" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete="on"
                            placeholder="Enter your Password"
                            className="w-full  pl-10 pr-3 py-2 border   rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                        <div className=" absolute right-3 text-gray-500 cursor-pointer" onClick={handlePasswordToggle}>
                            {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    onClick={handleClick}
                    className="w-full bg-blue-400 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
