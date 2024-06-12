import ConfirmationBox from '@utils/themes/components/ConfirmationBox';
import { useState } from 'react';
import { CiViewTable } from "react-icons/ci";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    // const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const navigate = useNavigate();
    const [isRotated, setIsRotated] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);

    const handleToggleDropdown = () => {
        setIsRotated(!isRotated)
    }
    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    }

    const handleLogout = () => {
        localStorage.removeItem('accessTokenInternProject');
        localStorage.removeItem('FirstName');
        navigate('/');
    };

    const firstName = localStorage.getItem('FirstName');
    return (
        <aside className='h-screen fixed w-40 md:w-64 bg-blue-400 px-4 py-4 shadow-lg'>
            <p className='text-xl'>Welcome, <span className='font-bold'>{firstName}</span></p>
            <ul className="mt-4 font-medium w-full  space-y-2 ">

                <li className='flex items-center cursor-pointer gap-x-2'>
                    <span><IoHomeOutline size={22} /></span>
                    <Link to='/admin'>Dashboard</Link>
                </li>
                <li className='flex items-center cursor-pointer gap-x-2'>
                    <span><CiViewTable size={22} /></span>
                    <Link to='/admin/manage-admin'>Manage Admin</Link>
                </li>

                <li onClick={handleToggleDropdown} className=' flex items-center cursor-pointer gap-x-2'>
                    <span className={` transition-transform duration-300 transform ${isRotated ? 'rotate-90' : ''}`}><MdOutlineSettings size={22} /></span>
                    Setting
                    {/* <span className={`transition-transform duration-300`}>{showDropdown ? <MdOutlineArrowDropUp size={22} /> : <MdOutlineArrowDropDown size={22} />}</span> */}
                </li>

                <li className='flex items-center cursor-pointer gap-x-2 '>
                    <span><RiLockPasswordLine size={22} /></span><Link to='/admin/changepassword'>Change Password</Link>
                </li>
                <li onClick={openModal} className='flex items-center cursor-pointer gap-x-2'><span><IoLogOutOutline size={22} /></span>Logout</li>


                {/* {showDropdown && (
                    <div className="dropdown-content px-6  my-2">
                        <li className='flex items-center cursor-pointer gap-x-2 pb-2'><span><RiLockPasswordLine size={22} /></span><Link to='/admin/changepassword'>Change Password</Link></li>
                        <li onClick={handleLogout} className='flex items-center cursor-pointer gap-x-2 pb-2'><span><IoLogOutOutline size={22} /></span>Logout</li>
                    </div>
                )} */}
            </ul>
            {modal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <ConfirmationBox onClose={closeModal} message='Logout' onConfirm={handleLogout} />
                    </div>
                </div>
            )}

        </aside >

    )
}

export default AdminSidebar