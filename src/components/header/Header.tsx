import LoginBtn from "./LoginBtn"
import Logo from "./Logo"
import Navbar from "./Navbar"

const Header = () => {
    return (
        <header className="flex flex-col  ">
            <div className="flex justify-between items-center px-10 py-2">
                <div>
                    <Logo />
                </div>
                <div>
                    <LoginBtn />
                </div>

            </div>
            <hr />

            <Navbar />
            <hr />
        </header>
    )
}

export default Header