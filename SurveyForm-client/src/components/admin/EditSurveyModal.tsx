import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { type Survey } from '../../types/survey.types';

const updateSurveySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone must be at least 10 characters').max(15),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    nationality: z.string().min(2, 'Nationality must be at least 2 characters').max(50),
    address: z.string().min(5, 'Address must be at least 5 characters').max(200),
    message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type UpdateSurveyForm = z.infer<typeof updateSurveySchema>;

interface EditSurveyModalProps {
    survey: Survey;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: string, data: UpdateSurveyForm) => void;
    isSubmitting: boolean;
}

export const EditSurveyModal = ({ survey, isOpen, onClose, onSubmit, isSubmitting }: EditSurveyModalProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateSurveyForm>({
        resolver: zodResolver(updateSurveySchema),
        defaultValues: {
            name: survey.name,
            email: survey.email,
            phone: survey.phone,
            gender: survey.gender as any,
            nationality: survey.nationality,
            address: survey.address,
            message: survey.message
        }
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                name: survey.name,
                email: survey.email,
                phone: survey.phone,
                gender: survey.gender as any,
                nationality: survey.nationality,
                address: survey.address,
                message: survey.message
            });
        }
    }, [isOpen, survey, reset]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Edit Submission</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit((data) => onSubmit(survey.id, data))} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                            <input {...register('name')} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-primary" />
                            {errors.name && <p className="text-red-400 flex items-center gap-1 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input {...register('email')} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-primary" />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                            <input {...register('phone')} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-primary" />
                            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                            <select {...register('gender')} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-primary">
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Nationality</label>
                        <input {...register('nationality')} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-primary" />
                        {errors.nationality && <p className="text-red-400 text-xs mt-1">{errors.nationality.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                        <textarea {...register('address')} rows={2} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-primary" />
                        {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                        <textarea {...register('message')} rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-primary" />
                        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-800">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-primary hover:bg-indigo-500 rounded-lg text-white font-medium transition disabled:opacity-50">
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
