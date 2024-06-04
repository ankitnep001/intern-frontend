import { toast } from "@components/toast/ToastManages";
import { EditAdminInterface } from "@interface/global.interface";
import axiosInstance from "@services/instance";
import Button from "@utils/themes/components/Button";
import InputField from "@utils/themes/components/InputField";
import Label from "@utils/themes/components/Label";
import SelectOption from "@utils/themes/components/SelectOption";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface EditAdminProps {
    adminId: string | null;
    onClose: () => void;
}

const EditAdmin = ({ adminId, onClose }: EditAdminProps) => {
    const [adminDetail, setAdminDetail] = useState<EditAdminInterface>();
    const { register, handleSubmit, reset } = useForm<EditAdminInterface>();

    // Fetch admin details when component mounts or adminId changes
    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const response = await axiosInstance.get(`/admin/${adminId}`);
                setAdminDetail(response.data.data);
                reset(response.data.data);
            } catch (error) {
                console.error('Error fetching admin details:', error);
            }
        };

        if (adminId) {
            fetchAdminDetails();
        }
    }, [adminId, reset]);

    const onSubmit: SubmitHandler<EditAdminInterface> = async (data) => {
        try {
            await axiosInstance({
                method: 'patch',
                url: '/admin',
                data: {
                    id: data.id,
                    role: data.role,
                    allowedFeature: data.allowedFeature,
                    firstName: {
                        en: data.details.firstName.en,

                    },
                    lastName: {
                        en: data.details.lastName.en,

                    },
                    phoneNumber: data.details.phoneNumber
                }

            });
            toast.show({ title: "Success", content: "Edited successfully", duration: 2000, type: 'success' });
            try {
                onClose();

            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            toast.show({ title: "Error", content: "Edit unsuccessful", duration: 2000, type: 'error' });
            console.error(error);
        }
    };

    if (!adminDetail) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold mb-2 text-2xl underline">Edit Admin</h1>
            <div className="relative flex space-x-5 mb-2">
                <div>
                    <Label label="First Name (EN):" name="details.firstName.en" />
                    <InputField type="text" name="details.firstName.en" placeholder="First Name" register={register} />
                </div>
                <div>
                    <Label label="Last Name (EN):" name="details.lastName.en" />
                    <InputField type="text" name="details.lastName.en" placeholder="Last Name" register={register} />
                </div>
            </div>

            <div className="relative mb-2">
                <Label label="Email:" name="email" />
                <InputField type="email" name="email" placeholder="Email" register={register} />
            </div>

            <div className="relative mb-2">
                <Label label="Feature" name="allowedFeature" />
                <SelectOption name="allowedFeature" options={[
                    { value: 'MANAGE_ADMIN', label: 'MANAGE_ADMIN' },
                    { value: 'SETUP', label: 'SETUP' }
                ]} placeholder="Select Feature" register={register} />
            </div>

            <div className="relative mb-2">
                <Label label="Roles" name="role" />
                <SelectOption name="role" options={[
                    { value: 'SUDO_ADMIN', label: 'SUDO_ADMIN' },
                    { value: 'SUPER_ADMIN', label: 'SUPER_ADMIN' },
                    { value: 'ADMIN', label: 'ADMIN' },
                    { value: 'USER', label: 'USER' }
                ]} placeholder="Select Role" register={register} />
            </div>

            <div className="relative mb-2">
                <Label label="Phone Number:" name="details.phoneNumber" />
                <InputField type="number" name="details.phoneNumber" placeholder="Phone Number" register={register} />
            </div>

            <Button type="submit">Update</Button>
        </form>
    );
};

export default EditAdmin;
