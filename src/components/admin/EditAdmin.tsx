import { GetAdminListProps } from "@interface/global.interface";
import { axiosInstance } from "@services/instance";
import Button from "@utils/themes/components/Button";
import InputField from "@utils/themes/components/InputField";
import Label from "@utils/themes/components/Label";
import { SubmitHandler, useForm } from "react-hook-form";

interface EditAdminProps {
    adminDetail: GetAdminListProps;
}

const EditAdmin = ({ adminDetail }: EditAdminProps) => {
    const { register, handleSubmit } = useForm<GetAdminListProps>({
        defaultValues: adminDetail,
    });

    const onSubmit: SubmitHandler<GetAdminListProps> = async (data) => {
        try {
            const response = await axiosInstance.patch(`/admin/${data.id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessTokenInternProject')}`
                }
            });

            console.log(response.data);
            alert('Admin details updated successfully');
        } catch (error) {
            console.log('Error updating details:', error);
            alert('Error updating admin details');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1>Edit Admin</h1>
                <div className="relative flex space-x-5 mb-2">
                    <div>
                        <Label label="First Name (EN):" name="details.firstName.en" />
                        <InputField type="text" name="details.firstName.en" placeholder='First Name' register={register} />
                    </div>
                    <div>
                        <Label label="Last Name (EN):" name="details.lastName.en" />
                        <InputField type="text" name="details.lastName.en" placeholder='Last Name' register={register} />
                    </div>
                </div>

                <div className="relative mb-2">
                    <Label label="Email:" name="email" />
                    <InputField type="email" name="email" placeholder='Email' register={register} />
                </div>

                <div className="relative mb-2">
                    <Label label="Phone Number:" name="details.phoneNumber" />
                    <InputField type="number" name="details.phoneNumber" placeholder='Phone Number' register={register} />
                </div>

                <Button type="submit">Update</Button>
            </div>
        </form>
    );
};

export default EditAdmin;
