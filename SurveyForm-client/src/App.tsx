import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './config/routes';
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/auth/PrivateRoute';

// Pages
import SurveyFormPage from './pages/SurveyFormPage';
import LoginPage from './pages/LoginPage';
import SubmissionsPage from './pages/SubmissionsPage';

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center p-8">
    <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
    <p className="text-2xl text-white mb-2">Page Not Found</p>
    <p className="text-gray-400">The page you are looking for doesn't exist.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col pt-[72px]">
        <div className="fixed top-0 w-full z-50">
          <Navbar />
        </div>
        <main className="flex-grow flex flex-col">
          <Routes>
            {/* Public Routes */}
            <Route path={ROUTES.HOME} element={<SurveyFormPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path={ROUTES.SUBMISSIONS} element={<SubmissionsPage />} />
            </Route>

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
