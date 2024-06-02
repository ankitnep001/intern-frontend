import React from "react";
interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({ type, children }) => {
    return (
        <button type={type}
            className="w-full bg-blue-400 text-white font-bold py-2 px-4 mb-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-2"
        >
            {children}
        </button>
    )
}

export default Button