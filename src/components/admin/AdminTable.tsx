import { GetAdminListProps } from "@interface/global.interface";
import { axiosInstance } from "@services/instance";
import { useEffect, useState } from "react";
const AdminTable = () => {
    const [usersList, setUsersList] = useState<GetAdminListProps[]>([]);

    useEffect(() => {
        axiosInstance({
            method: 'get',
            url: '/admin',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessTokenInternProject')}`
            }

        }).then((response) => {

            console.log(response.data.data?.data)
            setUsersList(response.data.data?.data)
            console.log(usersList)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <div className="relative overflow-x-auto w-full mt-10 px-5 ">
            <table className="w-full text-sm text-left  ">
                <thead className=" uppercase bg-blue-400 ">
                    <tr className="">
                        <th className="px-6 py-3">Username</th>
                        <th className="px-6 py-3">FirstName</th>
                        <th className="px-6 py-3">LastName</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList?.length > 0 && usersList.map((item, index) => {
                        return (
                            <tr key={index} className="odd:bg-white even:bg-blue-300">
                                <td className="px-6 py-3">{item?.username}</td>
                                <td className="px-6 py-3">{item.details.firstName?.en}</td>
                                <td className="px-6 py-3">{item.details.firstName?.en}</td>
                                <td className="px-6 py-3">{item?.email}</td>
                                <td className="px-6 py-3">{item?.role}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>

    )
}

export default AdminTable