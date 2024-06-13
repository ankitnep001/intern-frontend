import { GetAdminListProps } from "@interface/global.interface";
import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";

interface ViewDetailsProps {
    adminId: string | null;
}

const ViewDetails: React.FC<ViewDetailsProps> = ({ adminId }) => {
    const [adminDetail, setAdminDetail] = useState<GetAdminListProps>();

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/admin/${adminId}`);
            setAdminDetail(response.data.data);
        } catch (error) {
            console.log('Error fetching details:', error);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl mb-3 font-bold underline">Admin Details</h1>
            {adminDetail ? (
                <div className="border-2  shadow-md rounded-lg p-6 w-full max-w-md">
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
        </div>
    );
}

export default ViewDetails;
