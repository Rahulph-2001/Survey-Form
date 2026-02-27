import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authSchema, type AuthFormData } from '../validation/authSchema';
import { FormField } from '../components/form/FormField';
import { authService } from '../services/authService';
import { loginSuccess } from '../store/slices/authSlice';
import { ROUTES } from '../config/routes';
import { Toast } from '../components/common/Toast';

export const LoginPage = () => {
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
    });

    const onSubmit = async (data: AuthFormData) => {
        try {
            setIsLoading(true);
            const response = await authService.login(data);
            dispatch(loginSuccess(response.data.token));
            navigate(ROUTES.SUBMISSIONS);
        } catch (error: any) {
            setToast({
                message: error.response?.data?.message || 'Invalid credentials',
                type: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-background flex flex-col items-center justify-center p-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
                    <p className="text-gray-400">Sign in to view survey submissions</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        label="Username"
                        name="username"
                        register={register}
                        error={errors.username}
                        placeholder="Enter admin username"
                    />

                    <FormField
                        label="Password"
                        name="password"
                        type="password"
                        register={register}
                        error={errors.password}
                        placeholder="••••••••"
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 rounded-lg text-white font-medium text-lg transition-all duration-200 ${isLoading
                            ? 'bg-primary/50 cursor-not-allowed'
                            : 'bg-primary hover:bg-indigo-500 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]'
                            }`}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
