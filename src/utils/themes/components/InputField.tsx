import React from "react";
import { UseFormRegister } from 'react-hook-form';
interface InputFieldProps {
    name: string,
    type: string,
    placeholder: string,
    autocomplete?: 'on' | "off";
    register: UseFormRegister<any>;
}

const InputField: React.FC<InputFieldProps> = ({ name, type = 'text', placeholder, autocomplete, register }) => {
    return (
        <>
            < input
                type={type}
                id={name}
                placeholder={placeholder}
                autoComplete={autocomplete}
                {...register(name)}
                className="w-full  pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
        </>
    )
}

export default InputField

