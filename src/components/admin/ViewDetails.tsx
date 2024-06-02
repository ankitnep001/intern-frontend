import { GetAdminListProps } from "@interface/global.interface";
import { axiosInstance } from "@services/instance";
import Button from "@utils/themes/components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditAdmin from "./EditAdmin";

const ViewDetails = () => {
    const [adminDetail, setAdminDetail] = useState<GetAdminListProps>();
    const { id } = useParams<{ id: string }>();
    const [modal, setModal] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/admin/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessTokenInternProject')}`
                }
            });

            // console.log(response.data.data);
            setAdminDetail(response.data.data);
        } catch (error) {
            console.log('Error fetching detials:', error);

        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    //for modal
    const toggleModal = () => {
        setModal(prevState => !prevState);
    }


    return (

        <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl mb-3 font-bold ">Admin Details</h1>
            {/* Display admin details here */}
            {adminDetail ? (
                <div className=" bg-blue-300 shadow-md rounded-lg p-6 w-full max-w-md">
                    <p className="p-2">Username: {adminDetail.username}</p>
                    <p className="p-2">Email: {adminDetail.email}</p>
                    <p className="p-2">Role: {adminDetail.role.toString().toLowerCase()}</p>
                    {adminDetail.details ? (
                        <>
                            <p className="p-2">First Name (EN): {adminDetail.details.firstName.en}</p>
                            <p className="p-2">Last Name (EN): {adminDetail.details.lastName.en}</p>
                            <p className="p-2">Phone Number: {adminDetail.details.phoneNumber ?? 'N/A'}</p>
                        </>
                    ) : (
                        <p className="p-2">Details not available</p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div onClick={toggleModal} >
                <Button type="button"  >Edit</Button>
            </div>

            {modal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-end">
                            <button onClick={toggleModal} className="text-red-500">Close</button>
                        </div>
                        <EditAdmin adminDetail={adminDetail} />
                    </div>
                </div>
            )}
        </div >
    )
}

export default ViewDetails