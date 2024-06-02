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
                className="w-full  pl-10 pr-3 py-2 border rounded-md "
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
            {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5H7z" /></svg>
            </div> */}
        </div>
    )
}

export default SelectOption