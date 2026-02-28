import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { authService } from '../../services/authService';
import { ROUTES } from '../../config/routes';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch {
            // Ignore server errors — local logout proceeds regardless
        }
        dispatch(logout());
        navigate(ROUTES.LOGIN);
    };

    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
                <Link to={ROUTES.HOME} className="text-xl font-bold text-white shrink-0">
                    SurveyForm
                </Link>
                <div className="shrink-0">
                    {isAuthenticated ? (
                        <div className="flex gap-3 sm:gap-4 items-center text-sm md:text-base">
                            <Link to={ROUTES.SUBMISSIONS} className="text-gray-300 hover:text-white transition">
                                Submissions
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500/10 text-red-500 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-red-500/20 transition cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to={ROUTES.LOGIN} className="text-primary hover:text-indigo-400 font-medium transition text-sm md:text-base">
                            Admin Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
