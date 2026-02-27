import { type UseFormRegister, type FieldError } from 'react-hook-form';

interface Option {
    value: string | number;
    label: string;
}

interface SelectFieldProps {
    label: string;
    name: string;
    options: Option[];
    register: UseFormRegister<any>;
    error?: FieldError;
}

export const SelectField = ({ label, name, options, register, error }: SelectFieldProps) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select
            {...register(name)}
            className={`w-full bg-gray-800/50 border ${error ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary transition`}
        >
            <option value="">Select {label}</option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
);
