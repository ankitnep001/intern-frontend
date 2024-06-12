import { UseFormRegister } from 'react-hook-form';

interface Option {
    value: string;
    label: string;
}

interface SelectOptionProps {
    name: string;
    options: Option[];
    placeholder?: string;
    register: UseFormRegister<any>;
}
const SelectOption: React.FC<SelectOptionProps> = ({ name, options, placeholder, register }) => {
    return (
        <div className="relative">
            <select
                id={name}
                className="w-full px-2 py-2 border rounded-md "
                {...register(name)}
            >
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

        </div>
    )
}

export default SelectOption