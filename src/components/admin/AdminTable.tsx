import { GetAdminListProps } from "@interface/global.interface";
import { axiosInstance } from "@services/instance";
import { useEffect, useState } from "react";
// import { FaUsersViewfinder } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminTable = () => {
    const [adminList, setAdminList] = useState<GetAdminListProps[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/admin', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessTokenInternProject')}`,
                    },
                });

                // console.log(response.data.data?.data);
                setAdminList(response.data.data?.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                // Any cleanup logic or final operations
            }
        };

        fetchUsers();
    }, []);

    // delete admin
    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/admin/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessTokenInternProject')}`
                }
            });

        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div className="relative overflow-x-auto w-full mt-10 px-5 ">
            <table className="w-full text-sm text-center  ">
                <thead className=" uppercase bg-blue-400 ">
                    <tr className="">
                        <th className="px-6 py-3">S.N</th>
                        <th className="px-6 py-3">Username</th>
                        <th className="px-6 py-3">FirstName</th>
                        <th className="px-6 py-3">LastName</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">View</th>
                        <th className="px-6 py-3">Delete</th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {adminList?.length > 0 && adminList.map((item, index) => {
                        return (
                            <tr key={index} className="odd:bg-white even:bg-blue-300 ">
                                <td className="px-6 py-3">{index + 1}</td>
                                <td className="px-6 py-3">{item?.username}</td>
                                <td className="px-6 py-3">{item.details.firstName?.en}</td>
                                <td className="px-6 py-3">{item.details.firstName?.en}</td>
                                <td className="px-6 py-3">{item?.email}</td>
                                <td className="px-6 py-3">{item?.role.toString().toLowerCase()}</td>
                                <td className="px-6 py-3 font-bold text-blue-700 cursor-pointer"><Link to={`/admin/admintable/viewdetails/${item?.id}`}>View</Link></td>
                                <td className="px-6 py-3 text-red-600 inline-block cursor-pointer">
                                    <MdDeleteOutline size={24} onClick={() => handleDelete(item?.id)} />
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>

    )
}

export default AdminTable