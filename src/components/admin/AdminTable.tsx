import { toast } from "@components/toast/ToastManages";
import { GetAdminListProps } from "@interface/global.interface";
import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp, MdDeleteOutline } from "react-icons/md";
import { RiExpandUpDownFill } from "react-icons/ri";

import EditAdmin from "./EditAdmin";
import ViewDetails from "./ViewDetails";

const AdminTable = () => {
    const [adminList, setAdminList] = useState<GetAdminListProps[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<'view' | 'edit'>('view');
    const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
    const [sortStatus, setSortStatus] = useState<0 | 1 | 2>(0); // 0: both, 1: down, 2: up


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/admin');
                setAdminList(response.data.data?.data || []);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);



    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/admin/${id}`);
            setAdminList(prevList => prevList.filter(admin => admin.id !== id));
            toast.show({ title: "Success", content: "Deleted successfully", duration: 2000, type: 'success' });
        } catch (error) {
            console.error('Error deleting admin:', error);
            toast.show({ title: "Error", content: "Delete unsuccessful", duration: 2000, type: 'error' });
        }
    };

    const openModal = (type: 'view' | 'edit', adminId: string) => {
        setModalContent(type);
        setSelectedAdminId(adminId);
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        setSelectedAdminId(null);
    };

    //sort
    const handleSortClick = () => {
        setSortStatus(prevStatus => {
            const newStatus = prevStatus === 0 ? 1 : prevStatus === 1 ? 2 : 0;

            const sortedList = [...adminList].sort((a, b) => {
                const firstNameA = a.details.firstName?.en.toLowerCase() || '';
                const firstNameB = b.details.firstName?.en.toLowerCase() || '';

                if (newStatus === 1) {
                    return firstNameB.localeCompare(firstNameA); // Descending order
                } else if (newStatus === 2) {
                    return firstNameA.localeCompare(firstNameB); // Ascending order
                }
                return 0; // Default, no sorting
            });

            setAdminList(sortedList);
            return newStatus;
        });
    };

    return (
        <div className="table-container relative overflow-x-auto w-full mt-10 px-5">
            <table className="w-full text-sm text-center">
                <thead className="uppercase bg-blue-400">
                    <tr>
                        <th className="px-6 py-3">S.N</th>
                        <th className="px-6 py-3 flex justify-center items-center">FirstName
                            <div className="p-2 cursor-pointer" onClick={handleSortClick}>
                                {sortStatus === 0 && <RiExpandUpDownFill size={22} />}
                                {sortStatus === 1 && <MdArrowDropDown size={24} />}
                                {sortStatus === 2 && <MdArrowDropUp size={24} />}
                            </div>
                        </th>
                        <th className="px-6 py-3">LastName</th>
                        <th className="px-6 py-3">Username</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">View</th>
                        <th className="px-6 py-3">Edit</th>
                        <th className="px-6 py-3">Delete</th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {adminList?.length > 0 && adminList.map((item, index) => (
                        item && ( // Ensure the item is not undefined
                            <tr key={item.id} className="odd:bg-white even:bg-blue-300">
                                <td className="px-6 py-3">{index + 1}</td>
                                <td className="px-6 py-3">{item.details.firstName?.en}</td>
                                <td className="px-6 py-3">{item.details.lastName?.en}</td>
                                <td className="px-6 py-3">{item.username}</td>
                                <td className="px-6 py-3">{item.email}</td>
                                <td className="px-6 py-3">{item.role.toString().toLowerCase()}</td>
                                <td className="px-6 py-3 font-bold text-blue-700 cursor-pointer underline" onClick={() => openModal('view', item.id)}>
                                    View
                                </td>
                                <td className="px-6 py-3 font-bold text-blue-700 cursor-pointer underline" onClick={() => openModal('edit', item.id)}>
                                    Edit
                                </td>
                                <td className="px-6 py-3 text-red-600 inline-block cursor-pointer">
                                    <MdDeleteOutline size={24} onClick={() => handleDelete(item.id)} />
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
            {modal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-end">
                            <button onClick={closeModal} className="text-red-500 hover:bg-red-600 hover:text-white p-2 rounded-lg">Close</button>
                        </div>
                        {modalContent === 'view' ? (
                            <ViewDetails adminId={selectedAdminId} />
                        ) : (
                            <EditAdmin adminId={selectedAdminId} onClose={closeModal} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTable;
