
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import LoginBtn from "./LoginBtn";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
    const [menu, setMenu] = useState<boolean>(false)

    const handleMenu = () => {
        setMenu(!menu)
    }
    return (
        <header className="flex flex-col  ">
            <div className="flex justify-between items-center px-10 py-2">

                <div className="md:hidden lg:hidden flex items-center">
                    <button onClick={handleMenu}>
                        {menu ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                    </button>
                </div>

                <div>
                    <Logo />
                </div>
                <div>
                    <LoginBtn />
                </div>

            </div>
            <hr />
            <Navbar menu={menu} />
            <hr />
        </header>
    )
}

export default Header