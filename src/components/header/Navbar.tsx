import { Link } from "react-router-dom";

interface MenuProps {
    menu: boolean;
}
const Navbar: React.FC<MenuProps> = ({ menu }) => {
    return (
        <nav className="bg-gray-800 text-white">
            <ul className="hidden md:flex justify-center items-center gap-x-5 py-2">
                <li><Link to="/">Home</Link></li>
                <li><Link to="about">About</Link></li>
            </ul>

            {menu && (
                <ul className="flex flex-col md:hidden bg-gray-800 text-white text-center py-2">
                    <li><Link to="/" className="py-2">Home</Link></li>
                    <li><Link to="about" className="py-2">About</Link></li>

                </ul>
            )}
        </nav>
    );
};

export default Navbar;
