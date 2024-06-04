import { toast } from "@components/toast/ToastManages";
import { GetAdminListProps } from "@interface/global.interface";
import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
// import { FaUsersViewfinder } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import EditAdmin from "./EditAdmin";
import ViewDetails from "./ViewDetails";

const AdminTable = () => {
    const [adminList, setAdminList] = useState<GetAdminListProps[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<'view' | 'edit'>('view');
    const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/admin');

                // console.log(response.data.data?.data);
                setAdminList(response.data.data?.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // delete admin
    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/admin/${id}`);
            setAdminList(prevList => prevList.filter(admin => admin.id !== id));
            toast.show({ title: "Success", content: "Deleted successfully", duration: 2000, type: 'success' });
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.show({ title: "Error", content: "Created successfully", duration: 2000, type: 'error' });
        }

    };

    const openModal = (type: 'view' | 'edit', adminId: string) => {
        setModalContent(type);
        setSelectedAdminId(adminId);
        setModal(prevState => !prevState);
    };

    const closeModal = () => {
        setModal(false);
        setSelectedAdminId(null);
    };
    return (
        <div className=" table-container relative overflow-x-auto w-full mt-10 px-5 ">
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
                        <th className="px-6 py-3">Edit</th>
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
                                <td className="px-6 py-3">{item.details.lastName?.en}</td>
                                <td className="px-6 py-3">{item?.email}</td>
                                <td className="px-6 py-3">{item?.role.toString().toLowerCase()}</td>
                                <td className="px-6 py-3 font-bold text-blue-700 cursor-pointer underline" onClick={() => openModal('view', item.id)}>
                                    View
                                </td>
                                <td className="px-6 py-3 font-bold text-blue-700 cursor-pointer underline" onClick={() => openModal('edit', item.id)}>
                                    Edit
                                </td>
                                <td className="px-6 py-3 text-red-600 inline-block cursor-pointer">
                                    <MdDeleteOutline size={24} onClick={() => handleDelete(item?.id)} />
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
            {modal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-end">
                            <button onClick={closeModal} className="text-red-500 hover:bg-red-600 hover:text-white p-2 rounded-lg">Close</button>
                        </div>
                        {modalContent === 'view' ? <ViewDetails adminId={selectedAdminId} /> : <EditAdmin adminId={selectedAdminId} onClose={closeModal} />}
                    </div>
                </div>
            )}
        </div>

    )
}

export default AdminTable