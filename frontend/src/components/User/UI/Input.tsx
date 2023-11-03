// import React from 'react'

interface inputType {
    label?: string;
    htmlFor?: string;
    id: string;
    name?: string;
    type: string;
    placeholder?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    pattern?: string,
    title?: string
}

const Input: React.FC<inputType> = ({
    label,
    htmlFor,
    id,
    name,
    type,
    placeholder,
    value,
    onChange,
    pattern,
    title
}) => {
    return (
        <div>
            <label
                htmlFor={htmlFor}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    value={value}
                    onChange={onChange}
                    id={id}
                    name={name}
                    type={type}
                    autoComplete="on"
                    placeholder={placeholder}
                    pattern={pattern}
                    title={title}
                    required
                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    );
};

export default Input;
