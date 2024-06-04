import AdminSidebar from "@components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminTemplate = () => {

    //for protected route


    return (
        <>
            {/* <div className=""> */}
            <AdminSidebar />
            <div className="w-full h-screen pl-72">
                <Outlet />
            </div>
            {/* </div> */}
        </>
    );
};

export default AdminTemplate;
