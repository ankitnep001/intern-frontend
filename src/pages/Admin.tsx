import AdminDashboard from "@components/admin/AdminDashboard"
import AdminSidebar from "@components/admin/AdminSidebar"

const Admin = () => {
    return (
        <div className="flex">

            <AdminSidebar />

            <div className="flex-grow ">
                <AdminDashboard />
            </div>

        </div>)
}

export default Admin