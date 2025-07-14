import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Layout({ children, hideAdminLogin, fullWidth }: { children: ReactNode, hideAdminLogin?: boolean, fullWidth?: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname === '/admin';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const getPageTitle = () => {
    if (isAdmin) return 'Admin Dashboard';
    return 'Complaint Management System';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <h1 className="text-3xl font-bold text-indigo-600">
              {getPageTitle()}
            </h1>
            {location.pathname === '/admin' && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            )}
            {location.pathname === '/submit' && !hideAdminLogin && (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className={`flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 ${fullWidth ? '' : ''}`}>
        <div className={fullWidth ? 'w-full' : 'w-full max-w-3xl bg-white rounded-lg shadow-lg p-8'}>
          {children}
        </div>
      </main>
    </div>
  );
}
