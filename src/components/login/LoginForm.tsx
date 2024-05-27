
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
const LoginForm = () => {
    return (
        <form action="" className="flex justify-center items-center h-[86vh]">
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
                            type="password"
                            id="password"
                            placeholder="Enter your Password"
                            className="w-full  pl-10 pr-3 py-2 border   rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-400 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
