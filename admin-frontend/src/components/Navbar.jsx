import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">RohtakShoe</h1>
              <p className="text-purple-100 text-xs">Admin Control Center</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center space-x-2 ${
                isActive('/dashboard')
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </Link>

            <Link
              to="/products"
              className={`px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center space-x-2 ${
                isActive('/products')
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Inventory</span>
            </Link>

            <Link
              to="/add-product"
              className={`px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center space-x-2 ${
                isActive('/add-product')
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add New</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-white font-semibold text-sm">Admin User</p>
              <p className="text-purple-100 text-xs">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition duration-200 flex items-center space-x-2 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/20 transition duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/dashboard"
              onClick={() => setShowMobileMenu(false)}
              className={`block px-4 py-2 rounded-lg font-medium transition duration-200 ${
                isActive('/dashboard')
                  ? 'bg-white text-purple-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/products"
              onClick={() => setShowMobileMenu(false)}
              className={`block px-4 py-2 rounded-lg font-medium transition duration-200 ${
                isActive('/products')
                  ? 'bg-white text-purple-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Inventory
            </Link>
            <Link
              to="/add-product"
              onClick={() => setShowMobileMenu(false)}
              className={`block px-4 py-2 rounded-lg font-medium transition duration-200 ${
                isActive('/add-product')
                  ? 'bg-white text-purple-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Add New
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
