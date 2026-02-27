import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { surveySchema, type SurveyFormData } from '../validation/surveySchema';
import { FormField } from '../components/form/FormField';
import { SelectField } from '../components/form/SelectField';
import { TextareaField } from '../components/form/TextareaField';
import { surveyService } from '../services/surveyService';
import { Toast } from '../components/common/Toast';

const GENDER_OPTIONS = [
    { value: 'MALE', label: 'Male' },
    { value: 'FEMALE', label: 'Female' },
    { value: 'OTHER', label: 'Other' },
];

export const SurveyFormPage = () => {
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SurveyFormData>({
        resolver: zodResolver(surveySchema),
    });

    const onSubmit = async (data: SurveyFormData) => {
        try {
            setIsSubmitting(true);
            await surveyService.submitSurvey(data);
            setToast({ message: 'Survey submitted successfully!', type: 'success' });
            reset();
        } catch (error: any) {
            setToast({
                message: error.response?.data?.message || 'Failed to submit survey',
                type: 'error',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-background flex flex-col items-center justify-center sm:p-6 p-4 py-8">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="w-full max-w-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Customer Feedback</h1>
                    <p className="text-sm sm:text-base text-gray-400">We value your opinion. Please take a moment to share your thoughts.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        <FormField label="Full Name" name="name" register={register} error={errors.name} placeholder="John Doe" />
                        <FormField label="Email Address" name="email" type="email" register={register} error={errors.email} placeholder="john@example.com" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        <FormField label="Phone Number" name="phone" type="tel" register={register} error={errors.phone} placeholder="+1234567890" />
                        <SelectField label="Gender" name="gender" options={GENDER_OPTIONS} register={register} error={errors.gender} />
                    </div>

                    <FormField label="Nationality" name="nationality" register={register} error={errors.nationality} placeholder="e.g. American, Indian, etc." />
                    <TextareaField label="Address" name="address" register={register} error={errors.address} placeholder="Enter your full address" rows={2} />
                    <TextareaField label="Your Message / Feedback" name="message" register={register} error={errors.message} placeholder="Tell us what you think..." rows={4} />

                    {/* Anti-spam Honeypot Field - Hidden from normal users */}
                    <div className="hidden" aria-hidden="true">
                        <input type="text" {...register('honeypot')} tabIndex={-1} autoComplete="off" />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-lg text-white font-medium text-base sm:text-lg transition-all duration-200 mt-2 ${isSubmitting
                            ? 'bg-primary/50 cursor-not-allowed'
                            : 'bg-primary hover:bg-indigo-500 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]'
                            }`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Survey'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SurveyFormPage;
