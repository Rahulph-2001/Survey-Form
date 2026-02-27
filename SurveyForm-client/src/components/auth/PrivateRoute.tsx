import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { type RootState } from '../../store';
import { ROUTES } from '../../config/routes';

const PrivateRoute = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />
};

export default PrivateRoute;