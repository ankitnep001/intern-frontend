import { toast } from "@components/toast/ToastManages";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateAdminProps } from "@interface/global.interface";
import axiosInstance from "@services/instance";
import Button from "@utils/themes/components/Button";
import Checkbox from "@utils/themes/components/Checkbox";
import InputField from "@utils/themes/components/InputField";
import Label from "@utils/themes/components/Label";
import SelectOption from "@utils/themes/components/SelectOption";
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaRegUser } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
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
        .oneOf([yup.ref('firstPassword')], "Your Password doesn't match")
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
                middleName: { en: '', ne: '' },
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
                allowedFeature: data.allowedFeature,

            });
            reset();
            toast.show({ title: "Success", content: "Created successfully", duration: 2000, type: 'success' });
            console.log("data", data)

        } catch (error) {
            console.error('Error:', error);
            toast.show({ title: "Error", content: "Admin Create unsuccessfully", duration: 2000, type: 'error' });

        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className=" flex justify-center items-center  w-full md:mt-3 bg-slate-100" noValidate>
            <div className="flex flex-col bg-[#fefeff] shadow-md rounded-lg px-6  ">
                <div className="text-end" onClick={() => reset()}>
                    <button><GrPowerReset /></button>
                </div>
                <h1 className="text-center text-xl font-bold mb-4">Create Account</h1>

                {/* First Name*/}
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
                        <Label label="First Name (NE)" name="details.firstName.ne" />
                        <div className="relative flex items-center ">
                            <FaRegUser className=" absolute left-3 text-gray-500 " />
                            <InputField type="text" name="details.firstName.ne" placeholder='पहिलो नाम' register={register} />
                        </div>
                        {errors.details?.firstName?.ne &&
                            <span className="text-red-500 text-sm mt-1">{errors.details?.firstName?.ne.message}</span>
                        }
                    </div>
                </div>

                <div className="flex gap-x-3">
                    <div>
                        <Label label="Middle Name (EN)" name="details.middleName.en" />
                        <div className="relative flex items-center">
                            <FaRegUser className=" absolute left-3 text-gray-500 " />
                            <InputField type="text" name="details.middleName.en" placeholder='Last Name' register={register} />
                        </div>
                        {errors.details?.middleName?.en &&
                            <span className="text-red-500 text-sm mt-1">{errors.details?.middleName?.en.message}</span>
                        }
                    </div>

                    <div>
                        <Label label="Middle Name (NE)" name="details.middleName.ne" />
                        <div className="relative flex items-center">
                            <FaRegUser className=" absolute left-3 text-gray-500 " />
                            <InputField type="text" name="details.middleName.ne" placeholder='थर' register={register} />
                        </div>
                        {errors.details?.middleName?.ne &&
                            <span className="text-red-500 text-sm mt-1">{errors.details?.middleName?.ne.message}</span>
                        }
                    </div>

                </div>

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
                        <Label label="Last Name (NE)" name="details.lastName.ne" />
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
                    <Label label="Email" name="email" required={true} />
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
                <div className="relative mb-2 flex   gap-3">

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

                <div className="relative mb-2">
                    <Label label="Password" name="firstPassword" required={true} />
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
                    <Label label="Confirm Password" name="password" required={true} />
                    <div className="relative flex items-center">
                        <RiLockPasswordLine className="absolute left-3 text-gray-500" />
                        <InputField type="password" name='password' placeholder='Confirm Password' autocomplete="off" register={register} />
                    </div>
                    {errors.password &&
                        <span className="text-red-500 text-sm mt-1">{errors.password?.message}</span>
                    }
                </div>

                {/* Create Button */}

                <Button type="submit" children='Create' />

            </div>
        </form>
    )
}

export default CreateAdmin