import AdminSidebar from "@components/admin/AdminSidebar"
import HeroAnimation from "@components/home/HeroAnimation"
import { Outlet } from "react-router-dom"

const AdminTemplate = () => {
    return (
        <>
            <HeroAnimation />
            <div className="flex">
                <AdminSidebar />
                <Outlet />
            </div>
        </>
    )
}

export default AdminTemplate