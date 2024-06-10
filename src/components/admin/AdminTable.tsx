import { toast } from "@components/toast/ToastManages";
import { GetAdminListProps, IPagination } from "@interface/global.interface";
import axiosInstance from "@services/instance";
import { useDebounce } from "Debounce";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdArrowDropDown, MdArrowDropUp, MdDeleteOutline } from "react-icons/md";
import { RiExpandUpDownFill } from "react-icons/ri";
import EditAdmin from "./EditAdmin";
import Pagination from "./Pagination";
import ViewDetails from "./ViewDetails";


const AdminTable = () => {
    const [adminList, setAdminList] = useState<GetAdminListProps[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<'view' | 'edit'>('view');
    const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
    const [originalSort, setOriginalSort] = useState<GetAdminListProps[]>([]);
    const [sortStatus, setSortStatus] = useState<0 | 1 | 2>(0); // 0: both, 1: down, 2: up
    const [specificAdmin, setSpecificAdmin] = useState<GetAdminListProps | undefined>();
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [refresh, setRefresh] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500);
    const defaultPagination: IPagination = {
        total: 0,
        totalPages: 1,
        currentPage: 1,
        perpage: rowsPerPage,
    }
    const [totalPages, setTotalPages] = useState<IPagination>(defaultPagination);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get(`/admin?page=${totalPages.currentPage}&perpage=${rowsPerPage}&search=${debouncedSearch}`);
                const adminData = response.data.data?.data || [];
                setAdminList(adminData);
                setOriginalSort(adminData);
                setTotalPages(response.data.data.pagination);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [refresh, rowsPerPage, totalPages.currentPage, debouncedSearch]);

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

    const openModal = (type: 'view' | 'edit', admin: GetAdminListProps) => {
        setModalContent(type);
        setSpecificAdmin(admin);
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        setSelectedAdminId(null);
    };

    // Sort
    const handleSortClick = () => {
        setSortStatus(prevStatus => {
            const newStatus = prevStatus === 0 ? 1 : prevStatus === 1 ? 2 : 0;

            if (newStatus === 0) {
                setAdminList(originalSort);
            } else {
                const sortedList = [...adminList].sort((a, b) => {
                    const firstNameA = a.details.firstName?.en.toLowerCase() || '';
                    const firstNameB = b.details.firstName?.en.toLowerCase() || '';

                    if (newStatus === 1) {
                        return firstNameA.localeCompare(firstNameB);
                    } else if (newStatus === 2) {
                        return firstNameB.localeCompare(firstNameA);
                    }
                    return 0;
                });
                setAdminList(sortedList);
            }

            return newStatus;
        });
    };

    // Update admin list
    const updateAdminList = (updatedAdmin: GetAdminListProps) => {
        setAdminList(prevAdminList =>
            prevAdminList.map(admin => (admin.id === updatedAdmin?.id ? updatedAdmin : admin))
        );
    };

    return (
        <div className="relative w-full mt-10 px-5">
            <div className="flex justify-end items-center mb-2">
                <div>
                    <input
                        className="p-1 focus:outline-none"
                        type="text"
                        placeholder="Search User"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="absolute pr-2">
                    <FaSearch />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table-container w-full text-sm text-center">
                    <thead className="uppercase bg-blue-400">
                        <tr>
                            <th className="px-6 py-3">S.N</th>
                            {/* sort firstName */}
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
                            item && (
                                <tr key={item.id} className="odd:bg-white even:bg-blue-300">
                                    <td className="px-6 py-3">{(totalPages.currentPage - 1) * totalPages.perpage + index + 1}</td>
                                    <td className="px-6 py-3">{item.details.firstName.en}</td>
                                    <td className="px-6 py-3">{item.details.lastName.en}</td>
                                    <td className="px-6 py-3">{item.username.toLowerCase()}</td>
                                    <td className="px-6 py-3">{item.email}</td>
                                    <td className="px-6 py-3">{item.role.toLowerCase()}</td>
                                    <td className="px-6 py-3 font-bold text-blue-700 cursor-pointer underline" onClick={() => { setSelectedAdminId(item?.id); openModal('view', item) }}>
                                        View
                                    </td>
                                    <td className="px-6 py-3 font-bold text-blue-700 cursor-pointer underline" onClick={() => openModal('edit', item)}>
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
                <Pagination
                    totalPages={totalPages}
                    setTotalPages={setTotalPages}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    setRefresh={setRefresh}
                />
                {modal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <div className="flex justify-end">
                                <button onClick={closeModal} className="text-red-500 hover:bg-red-600 hover:text-white p-2 rounded-lg">Close</button>
                            </div>
                            {modalContent === 'view' ? (
                                <ViewDetails adminId={selectedAdminId} />
                            ) : (
                                <EditAdmin admin={specificAdmin} onClose={closeModal} onUpdate={updateAdminList} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTable;
