import { type UseFormRegister, type FieldError } from 'react-hook-form';

interface TextareaFieldProps {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    placeholder?: string;
    rows?: number;
}

export const TextareaField = ({ label, name, register, error, placeholder, rows = 4 }: TextareaFieldProps) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <textarea
            {...register(name)}
            placeholder={placeholder}
            rows={rows}
            className={`w-full bg-gray-800/50 border ${error ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary transition resize-none`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
);
