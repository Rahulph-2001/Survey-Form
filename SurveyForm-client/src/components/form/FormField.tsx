import { type UseFormRegister, type FieldError } from 'react-hook-form';

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    placeholder?: string;
}

export const FormField = ({ label, name, type = 'text', register, error, placeholder }: FormFieldProps) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input
            type={type}
            {...register(name)}
            placeholder={placeholder}
            className={`w-full bg-gray-800/50 border ${error ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary transition`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
);
