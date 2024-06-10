import AdminSidebar from "@components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminTemplate = () => {

    return (
        <>
            {/* <div className=""> */}
            <AdminSidebar />
            <div className="w-full h-full pl-44 md:pl-72">
                <Outlet />
            </div>
            {/* </div> */}
        </>
    );
};

export default AdminTemplate;
