import { toast } from "@components/toast/ToastManages";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateAdminProps } from "@interface/global.interface";
import axiosInstance from "@services/instance";
import Button from "@utils/themes/components/Button";
import InputField from "@utils/themes/components/InputField";
import Label from "@utils/themes/components/Label";
import SelectOption from "@utils/themes/components/SelectOption";
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import * as yup from 'yup';

// validation from yup
const validationSchema = yup.object().shape({
    details: yup.object().shape({
        firstName: yup.object().shape({
            en: yup.string().required('First Name is required'),
            ne: yup.string().notRequired() //optional
        }),
        lastName: yup.object().shape({
            en: yup.string().required('Last Name (EN) is required'),
            ne: yup.string().notRequired() // Optional
        }),
        phoneNumber: yup.string().required('Phone Number is required')
    }),
    email: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format').required('Email is required'),
    firstPassword: yup.string().required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(16, 'Password cannot exceed 16 characters'),
    password: yup.string().required('Confirm Password is required')
        .oneOf([yup.ref('firstPassword')], 'Passwords must match')
});


const CreateAdmin = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateAdminProps>({
        defaultValues: {
            email: '',
            role: 'ADMIN',
            username: '',
            firstPassword: '',
            password: '',
            allowedFeature: [],
            details: {
                firstName: { en: '', ne: '' },
                lastName: { en: '', ne: '' },
                phoneNumber: '',
            }
        },
        resolver: yupResolver(validationSchema),
    })


    const onSubmit: SubmitHandler<CreateAdminProps> = async (data) => {
        try {
            await axiosInstance.post('/admin', {
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
                allowedFeature: [data.allowedFeature],

            });
            reset();
            toast.show({ title: "Success", content: "Created successfully", duration: 2000, type: 'success' });


        } catch (error) {
            console.error('Error:', error);
            toast.show({ title: "Error", content: "Admin Create unsuccessfully", duration: 2000, type: 'error' });

        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className=" flex justify-center items-center h-screen w-full bg-slate-50" noValidate>
            <div className="flex flex-col bg-[#fefeff] shadow-md rounded-lg p-6 w-full max-w-md ">
                <h1 className="text-center text-2xl font-bold mb-4">Create Account</h1>

                {/* First and Last Name */}
                <div className="relative flex space-x-5 mb-2">
                    <div>
                        <Label label="First Name:" name="details.firstName.en" />
                        <div className="relative flex items-center">
                            {/* <CgProfile className=" absolute left-3 text-gray-500 " /> */}
                            <InputField type="text" name="details.firstName.en" placeholder='First Name' register={register} />
                        </div>
                        {errors.details?.firstName?.en &&
                            <span className="text-red-500 text-sm mt-1">{errors.details?.firstName?.en.message}</span>
                        }
                    </div>

                    <div>
                        <Label label="Last Name:" name="details.lastName.en" />
                        <div className="relative flex items-center">
                            {/* <CgProfile className=" absolute left-3 text-gray-500 " /> */}
                            <InputField type="text" name="details.lastName.en" placeholder='Last Name' register={register} />
                        </div>
                        {errors.details?.lastName?.en &&
                            <span className="text-red-500 text-sm mt-1">{errors.details?.lastName?.en.message}</span>
                        }
                    </div>
                </div>

                {/* Email */}
                <div className="relative mb-2">
                    <Label label="Email:" name="email" />
                    <div className="relative flex items-center">
                        <MdOutlineEmail className=" absolute left-3 text-gray-500 " />
                        <InputField type="email" name='email' placeholder='Enter your Email' register={register} />
                    </div>
                    {errors.email &&
                        <span className="text-red-500 text-sm mt-1">{errors.email?.message}</span>
                    }
                </div>

                {/* Phone Number */}
                <div className="relative mb-2">
                    <Label label="Phone Number:" name="details.phoneNumber" />
                    <div className="relative flex items-center">
                        <MdOutlineLocalPhone className="absolute left-3 text-gray-500" />
                        <InputField type="number" name="details.phoneNumber" placeholder='Enter your Phone Number' register={register} />
                    </div>
                    {errors.details?.phoneNumber &&
                        <span className="text-red-500 text-sm mt-1">{errors.details?.phoneNumber?.message}</span>
                    }
                </div>

                {/* Role and allowedFeature */}

                {/* allowed Features */}
                <div className="relative mb-2 flex gap-3">
                    <div className="">
                        <Label label="Feature" name="allowedFeature" />
                        <div>
                            <SelectOption name="allowedFeature" options={[
                                { value: 'MANAGE_ADMIN', label: 'MANAGE_ADMIN' },
                                { value: 'SETUP', label: 'SETUP' }
                            ]}
                                placeholder="Select Feature" register={register} />
                        </div>
                    </div>
                    <div>
                        <Label label="Select Role:" name="role" />
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
                </div>
                {/* Role */}
                {/* <div className="relative mb-2">
                        
                    </div> */}


                {/* Password */}
                <div className="relative mb-2">
                    <Label label="Password:" name="firstPassword" />
                    <div className="relative flex items-center">
                        <RiLockPasswordLine className="absolute left-3 text-gray-500" />
                        <InputField type="password" name='firstPassword' placeholder='Password' autocomplete="off" register={register} />
                    </div>
                    {errors.firstPassword &&
                        <span className="text-red-500 text-sm mt-1">{errors.firstPassword?.message}</span>
                    }
                </div>

                {/* Confirm Password */}
                <div className="relative mb-2">
                    <Label label="Confirm Password:" name="password" />
                    <div className="relative flex items-center">
                        <RiLockPasswordLine className="absolute left-3 text-gray-500" />
                        <InputField type="password" name='password' placeholder='Confirm Password' autocomplete="off" register={register} />
                    </div>
                    {errors.password &&
                        <span className="text-red-500 text-sm mt-1">{errors.password?.message}</span>
                    }
                </div>

                {/* Create Button */}
                <Button type="submit">Create</Button>
            </div>
        </form>)
}

export default CreateAdmin