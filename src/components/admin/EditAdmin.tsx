import { toast } from "@components/toast/ToastManages";
import { EditAdminInterface } from "@interface/global.interface";
import axiosInstance from "@services/instance";
import Button from "@utils/themes/components/Button";
import InputField from "@utils/themes/components/InputField";
import Label from "@utils/themes/components/Label";
import SelectOption from "@utils/themes/components/SelectOption";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface EditAdminProps {
    admin: any;
    onClose: () => void;
    onUpdate: (updatedAdmin: any) => void;
}

const EditAdmin = ({ admin, onClose, onUpdate }: EditAdminProps) => {
    const { register, handleSubmit, reset } = useForm<EditAdminInterface>();

    useEffect(() => {
        const fetchEdit = async () => {
            try {
                reset({
                    email: admin.email,
                    role: admin.role,
                    allowedFeature: admin.allowedFeature,
                    details: {
                        firstName: {
                            en: admin.details.firstName.en,
                            ne: admin.details.firstName.ne,
                        },
                        lastName: {
                            en: admin.details.lastName.en,
                            ne: admin.details.lastName.ne,
                        },
                        phoneNumber: admin.details.phoneNumber
                    }
                });
            } catch (error) {
                console.error(error);
                toast.show({ title: "error", content: "Edit Unsuccessful", duration: 2000, type: 'error' });
            }
        };

        fetchEdit();
    }, [admin, reset]);

    //for merging the data in table
    const deepMerge = (target: any, source: any): any => {
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object') {
                if (!target[key]) {
                    target[key] = {};
                }
                deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
        return target;
    };

    const onSubmit: SubmitHandler<EditAdminInterface> = async (data) => {
        try {
            await axiosInstance.patch(`/admin`, {
                id: admin.id,
                role: data.role,
                allowedFeature: data.allowedFeature,
                firstName: {
                    en: data.details.firstName.en,
                    ne: data.details.firstName.ne,
                },
                lastName: {
                    en: data.details.lastName.en,
                    ne: data.details.lastName.ne,
                },
                phoneNumber: data.details.phoneNumber,
            });
            toast.show({ title: "Success", content: "Edited successfully", duration: 2000, type: 'success' });
            const UpdatedUserData = deepMerge(admin, data);
            console.log(data)
            onUpdate(UpdatedUserData);
            onClose();
        } catch (error) {
            toast.show({ title: "Error", content: "Edit unsuccessful", duration: 2000, type: 'error' });
            console.error(error);
        }
    };

    if (!admin) {
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

            <div className="relative mb-2 disabled">
                <Label label="Email:" name="email" />
                <InputField type="email" name="email" placeholder="Email" register={register} disabled />
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
