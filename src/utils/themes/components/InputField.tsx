import React from "react";
import { UseFormRegister } from 'react-hook-form';
interface InputFieldProps {
    name: string,
    type: string,
    placeholder: string,
    autocomplete?: 'on' | "off";
    disabled?: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
}

const InputField: React.FC<InputFieldProps> = ({ name, type = 'text', placeholder, autocomplete, disabled, register }) => {
    return (
        <>
            < input
                type={type}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autocomplete}
                {...register(name)}
                className={`w-full pb-2 pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 ${disabled ? 'cursor-not-allowed' : ''}`} />
        </>
    )
}

export default InputField

