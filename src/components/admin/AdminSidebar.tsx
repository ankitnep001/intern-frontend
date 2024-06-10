import Logo from '@components/header/Logo';
import { useState } from 'react';
import { CiViewTable } from "react-icons/ci";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp, MdOutlineSettings } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";



import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [isRotated, setIsRotated] = useState<boolean>(false);

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
        setIsRotated(!isRotated)
    }

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('accessTokenInternProject');
        navigate('/');
        // window.location.reload();

    };
    return (
        <aside className='h-screen fixed w-40 md:w-72 bg-blue-300 px-4 shadow-lg'>
            <Logo />
            <ul className="mt-4 font-medium w-full  space-y-2">

                <li className='flex items-center cursor-pointer gap-x-2'>
                    <span><IoHomeOutline size={22} /></span>
                    <Link to='/admin'>Dashboard</Link>
                </li>
                <li className='flex items-center cursor-pointer gap-x-2'>
                    <span><CiViewTable size={22} /></span>
                    <Link to='/admin/manage_admin'>Manage Admin</Link>
                </li>


                <li onClick={handleToggleDropdown} className=' flex items-center cursor-pointer gap-x-2'>
                    <span className={` transition-transform duration-300 transform ${isRotated ? 'rotate-90' : ''}`}><MdOutlineSettings size={22} /></span>
                    Setting
                    <span className={`transition-transform duration-300`}>{showDropdown ? <MdOutlineArrowDropUp size={22} /> : <MdOutlineArrowDropDown size={22} />}</span>
                </li>
                {showDropdown && (
                    <div className="dropdown-content px-6  my-2">
                        <li className='flex items-center cursor-pointer gap-x-2 pb-2'><span><RiLockPasswordLine size={22} /></span><Link to='/admin/changepassword'>Change Password</Link></li>
                        <li onClick={handleLogout} className='flex items-center cursor-pointer gap-x-2 pb-2'><span><IoLogOutOutline size={22} /></span>Logout</li>
                    </div>
                )}
            </ul>

        </aside >
    )
}

export default AdminSidebar