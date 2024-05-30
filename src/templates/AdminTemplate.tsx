import AdminSidebar from "@components/admin/AdminSidebar"
import { Outlet } from "react-router-dom"

const AdminTemplate = () => {
    return (
        <>
            <div className="flex">
                <AdminSidebar />
                <Outlet />
            </div>
        </>
    )
}

export default AdminTemplate