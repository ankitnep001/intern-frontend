import AdminSidebar from "@components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminTemplate = () => {
    return (
        <div className="flex h-screen">
            <AdminSidebar />
            <div className="w-full h-full pl-44 md:pl-64 flex justify-center items-center">
                <div className="block md:hidden">
                    <p className="text-lg font-bold">Please open this page on a PC or laptop for the best experience.</p>
                </div>
                <div className="hidden md:block w-full h-full ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminTemplate;
