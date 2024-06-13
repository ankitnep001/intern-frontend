import React from 'react'
interface LabelProps {
    name: string,
    label: string,
    required?: boolean,
}
const Label: React.FC<LabelProps> = ({ name, label, required }) => {
    return (
        <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
    )
}
export default Label