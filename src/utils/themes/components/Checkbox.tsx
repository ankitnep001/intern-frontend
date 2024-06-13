import React from 'react';
import { UseFormRegister } from 'react-hook-form';
interface CheckboxProps {
    // label: string;
    name: string;
    options: { label: string; value: string }[];
    register: UseFormRegister<any>;

}
const Checkbox: React.FC<CheckboxProps> = ({ name, options, register }) => {
    return (
        <div >
            {/* <label>{label}</label> */}
            <div >
                {options.map((option) => (
                    <div key={option.value} >
                        <label>
                            <input
                                type="checkbox"
                                value={option.value}
                                {...register(name)}
                            />
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Checkbox;