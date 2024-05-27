import Logo from "@components/header/Logo";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="px-14 py-5 border-t-2 border-black">


            <div className=" flex flex-col md:flex-row  justify-between pb-4">
                <div className="w-fit text-2xl">
                    <Logo />
                </div>

                <div className="flex items-center">
                    <ul className="flex flex-col md:flex-row justify-center items-center gap-x-5 py-2">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="about">About</Link></li>
                    </ul>
                </div>

            </div>
            <hr />
            {/* copyright */}
            <div className="flex flex-col md:flex-row gap-y-3 justify-between py-4 ">

                <p>© Intern. 2024, Mid-Baneshwor. All rights reserved</p>

                <div className="flex items-center gap-2 text-lg md:text-2xl text-blue-400 ">
                    <FaFacebook />
                    <FaInstagram />
                    <FaTwitter />
                    <FaYoutube />
                </div>
            </div>
        </footer>

    )
}

export default Footer