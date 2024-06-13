import { toast } from "@components/toast/ToastManages";
import { EditAdminInterface } from "@interface/global.interface";
import axiosInstance from "@services/instance";
import Button from "@utils/themes/components/Button";
import Checkbox from "@utils/themes/components/Checkbox";
import InputField from "@utils/themes/components/InputField";
import Label from "@utils/themes/components/Label";
import SelectOption from "@utils/themes/components/SelectOption";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";

interface EditAdminProps {
    admin: any;
    onClose: () => void;
    onUpdate: (updatedAdmin: any) => void;
}

const EditAdmin = ({ admin, onClose, onUpdate }: EditAdminProps) => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EditAdminInterface>();

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
    const deepMerge = (target: any, source: any) => {
        for (const key in source) {
            if (Array.isArray(source[key])) {
                target[key] = source[key];
            } else if (source[key] && typeof source[key] === 'object') {
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
            const UpdatedUserData = deepMerge({ ...admin }, data);
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
            {/* <div className="flex flex-col bg-[#fefeff] shadow-md rounded-lg p-6 w-full max-w-md "> */}

            {/* First and Last Name */}
            <div className="flex  gap-x-3">
                <div>
                    <Label label="First Name (EN)" name="details.firstName.en" required={true} />
                    <div className="relative flex items-center ">
                        <FaRegUser className=" absolute left-3  text-gray-500 " />
                        <InputField type="text" name="details.firstName.en" placeholder='First Name' register={register} />
                    </div>
                    {errors.details?.firstName?.en &&
                        <span className="text-red-500 text-sm mt-1">{errors.details?.firstName?.en.message}</span>
                    }
                </div>

                <div>
                    <Label label="First Name (NE)" name="details.firstName.ne" required={true} />
                    <div className="relative flex items-center ">
                        <FaRegUser className=" absolute left-3 text-gray-500 " />
                        <InputField type="text" name="details.firstName.ne" placeholder='पहिलो नाम' register={register} />
                    </div>
                    {errors.details?.firstName?.ne &&
                        <span className="text-red-500 text-sm mt-1">{errors.details?.firstName?.ne.message}</span>
                    }
                </div>

            </div>


            {/* </div> */}
            <div className="flex gap-x-3">
                <div>
                    <Label label="Last Name (EN)" name="details.lastName.en" required={true} />
                    <div className="relative flex items-center">
                        <FaRegUser className=" absolute left-3 text-gray-500 " />
                        <InputField type="text" name="details.lastName.en" placeholder='Last Name' register={register} />
                    </div>
                    {errors.details?.lastName?.en &&
                        <span className="text-red-500 text-sm mt-1">{errors.details?.lastName?.en.message}</span>
                    }
                </div>

                <div>
                    <Label label="Last Name (NE)" name="details.lastName.ne" required={true} />
                    <div className="relative flex items-center">
                        <FaRegUser className=" absolute left-3 text-gray-500 " />
                        <InputField type="text" name="details.lastName.ne" placeholder='थर' register={register} />
                    </div>
                    {errors.details?.lastName?.ne &&
                        <span className="text-red-500 text-sm mt-1">{errors.details?.lastName?.ne.message}</span>
                    }
                </div>

            </div>

            {/* Email */}
            <div className="relative mb-2">
                <Label label="Email" name="email" />
                <div className="relative flex items-center">
                    <MdOutlineEmail className=" absolute left-3 text-gray-500 " />
                    <InputField type="email" name='email' placeholder='Enter your Email' register={register} disabled />
                </div>
                {errors.email &&
                    <span className="text-red-500 text-sm mt-1">{errors.email?.message}</span>
                }
            </div>

            {/* Phone Number */}
            <div className="relative mb-2">
                <Label label="Phone Number" name="details.phoneNumber" required={true} />
                <div className="relative flex items-center">
                    <MdOutlineLocalPhone className="absolute left-3 text-gray-500" />
                    <InputField type="tel" name="details.phoneNumber" placeholder='Enter your Phone Number' register={register} />
                </div>
                {errors.details?.phoneNumber &&
                    <span className="text-red-500 text-sm mt-1">{errors.details?.phoneNumber?.message}</span>
                }
            </div>

            {/* Role and allowedFeature */}

            {/* allowed Features */}
            <div className="relative mb-2 flex  gap-3">

                <div>
                    <Label label="Select Role" name="role" required={true} />
                    <div>
                        <SelectOption name="role" options={[
                            { value: 'SUDO_ADMIN', label: 'Sudo Admin' },
                            { value: 'SUPER_ADMIN', label: 'Super Admin' },
                            { value: 'ADMIN', label: 'Admin' },
                            { value: 'USER', label: 'User' }
                        ]}
                            placeholder="Select a role" register={register} />
                    </div>
                </div>
                <div className="">
                    <Label label="Features" name="allowedFeature" required={true} />
                    <Checkbox name='allowedFeature' options={[
                        { label: 'Setup', value: 'SETUP' },
                        { label: 'Manage Admin', value: 'MANAGE_ADMIN' }
                    ]}
                        register={register} />
                </div>
            </div>


            {/* Create Button */}
            <Button type="submit" submitting={isSubmitting}>Update</Button>
            {/* </div> */}
        </form>
    );
};

export default EditAdmin;
