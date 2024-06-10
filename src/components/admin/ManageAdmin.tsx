import { useState } from "react";
import AdminTable from "./AdminTable";
import CreateAdmin from "./CreateAdmin";
const ManageAdmin = () => {
    const [showAdmin, setShowAdmin] = useState<boolean>(true);
    return (
        <div className=" w-full h-full p-4 bg-slate-100 ">
            <div className="flex justify-between ">
                <h1 className="text-3xl underline font-bold">Manage Admin</h1>

                <div>
                    <button
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 mb-2 rounded-md  mt-2"
                        onClick={() => setShowAdmin(!showAdmin)}>
                        {showAdmin ? 'Create Admin' : 'AdminList'}
                    </button>
                </div>
            </div>
            {showAdmin ? <AdminTable /> : <CreateAdmin />}
        </div>
    )
}

export default ManageAdmin