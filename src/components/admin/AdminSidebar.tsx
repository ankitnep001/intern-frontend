import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('accessTokenInternProject');
        navigate('/');
        window.location.reload();

    };
    return (

        <aside id="cta-button-sidebar" className='h-screen w-52 bg-slate-400'>

            <ul className="space-y-2 font-medium">
                <li>

                    <span className="ms-3">Dashboard</span>

                </li>
                <li>

                </li>

            </ul>


            <button onClick={handleLogout} className='border-2 border-black'>Logout</button>
        </aside >




    )
}

export default AdminSidebar