import React from 'react'
interface LabelProps {
    name: string,
    label: string,
}
const Label: React.FC<LabelProps> = ({ name, label }) => {
    return (
        <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
            {label}
        </label>
    )
}

export default Label