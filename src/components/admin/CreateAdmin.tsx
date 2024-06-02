import { CreateAdminProps } from "@interface/global.interface";
import { axiosInstance } from "@services/instance";
import Button from "@utils/themes/components/Button";
import InputField from "@utils/themes/components/InputField";
import Label from "@utils/themes/components/Label";
import SelectOption from "@utils/themes/components/SelectOption";
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";


//validation from yup
// const validationSchema = yup.object({
// email: yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format'),
// password: yup.string().required("Password is required")
//     .min(8, "Password length should be at least 8 characters")
//     .max(16, "Password cannot exceed more than 16 characters")
// })
const CreateAdmin = () => {
    const { register, handleSubmit } = useForm<CreateAdminProps>({
        defaultValues: {
            email: '',
            role: 'ADMIN',
            username: '',
            password: '',
            allowedFeature: [],
            details: {
                firstName: { en: '', ne: '' },
                lastName: { en: '', ne: '' },
                phoneNumber: 0,
            }
        }
        // resolver: yupResolver(validationSchema)
    })


    const onSubmit: SubmitHandler<CreateAdminProps> = async (data) => {
        try {
            const response = await axiosInstance.post('/admin', {
                email: data.email,
                role: data.role,
                password: data.password,
                details: {
                    firstName: {
                        en: data.details.firstName.en,
                        ne: data.details.firstName.ne,
                    },
                    lastName: {
                        en: data.details.lastName.en,
                        ne: data.details.lastName.ne,
                    },

                    phoneNumber: data.details.phoneNumber,
                },
                allowedFeature: data.allowedFeature,

            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessTokenInternProject')}`
                }
            });

            // alert(response.data?.message)
            console.log(response)

        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className=" flex justify-center items-center h-screen w-full" noValidate>
            <div className="flex flex-col bg-[#fefeff] shadow-md rounded-lg p-6 w-full max-w-md ">
                <h1 className="text-center text-2xl font-bold mb-4">Create Account</h1>

                {/* First and Last Name */}
                <div className="relative flex space-x-5 mb-2">
                    <div>
                        <Label label="First Name:" name="details.firstName.en" />
                        <div className="reletive flex items-center">
                            {/* <CgProfile className=" absolute left-3 text-gray-500 " /> */}
                            <InputField type="text" name="details.firstName.en" placeholder='First Name' register={register} />
                        </div>
                    </div>

                    <div>
                        <Label label="Last Name:" name="details.lastName.en" />
                        <div className="reletive flex items-center">
                            {/* <CgProfile className=" absolute left-3 text-gray-500 " /> */}
                            <InputField type="text" name="details.lastName.en" placeholder='Last Name' register={register} />
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className="relative mb-2">
                    <Label label="Email:" name="email" />
                    <div className="relative flex items-center">
                        <MdOutlineEmail className=" absolute left-3 text-gray-500 " />
                        <InputField type="email" name='email' placeholder='Enter your Email' register={register} />
                    </div>
                </div>

                {/* Phone Number */}
                <div className="relative mb-2">
                    <Label label="Phone Number:" name="details.phoneNumber" />
                    <div className="relative flex items-center">
                        <MdOutlineLocalPhone className="absolute left-3 text-gray-500" />
                        <InputField type="number" name="details.phoneNumber" placeholder='Enter your Phone Number' register={register} />
                    </div>
                </div>

                {/* Role and allowedFeature */}
                <div>

                    {/* allowed Features */}
                    <div className="relative mb-2">
                        <Label label="Feature" name="allowedFeature" />
                        <div>
                            <SelectOption name="allowedFeature" options={[
                                { value: 'MANAGE_ADMIN', label: 'MANAGE_ADMIN' },
                                { value: 'SETUP', label: 'SETUP' }
                            ]}
                                placeholder="Select Feature" register={register} />
                        </div>
                    </div>
                    {/* Role */}
                    <div className="relative mb-2">
                        <Label label="Select Role:" name="role" />
                        <div>
                            <SelectOption name="role" options={[
                                { value: 'SUDO_ADMIN', label: 'Sudo Admin' },
                                { value: 'SUPER_ADMIN', label: 'Super Admin' },
                                { value: 'ADMIN', label: 'Admin' }
                            ]}
                                placeholder="Select a role" register={register} />
                        </div>
                    </div>
                </div>

                {/* Password */}
                <div className="relative mb-2">
                    <Label label="Password:" name="firstPassword" />
                    <div className="relative flex items-center">
                        <RiLockPasswordLine className="absolute left-3 text-gray-500" />
                        <InputField type="password" name='firstPassword' placeholder='Password' autocomplete="off" register={register} />
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="relative mb-2">
                    <Label label="Confirm Password:" name="password" />
                    <div className="relative flex items-center">
                        <RiLockPasswordLine className="absolute left-3 text-gray-500" />
                        <InputField type="password" name='password' placeholder='Confirm Password' autocomplete="off" register={register} />
                    </div>
                </div>

                {/* Create Button */}
                <Button type="submit">Create</Button>
            </div>
        </form>)
}

export default CreateAdmin