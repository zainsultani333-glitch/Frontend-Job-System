import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              JobBoard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors duration-200 font-medium ${
                isActive('/') ? 'text-indigo-600' : ''
              }`}
            >
              Home
            </Link>

            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors duration-200 font-medium ${
                    isActive('/dashboard') ? 'text-indigo-600' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/my-jobs" 
                  className={`px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors duration-200 font-medium ${
                    isActive('/my-jobs') ? 'text-indigo-600' : ''
                  }`}
                >
                  My Jobs
                </Link>
                <Link 
                  to="/create-job" 
                  className={`px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors duration-200 font-medium ${
                    isActive('/create-job') ? 'text-indigo-600' : ''
                  }`}
                >
                  Post Job
                </Link>
                
                {user.role === 'admin' && (
                  <div className="relative">
                    <button
                      onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                      onBlur={() => setTimeout(() => setIsAdminDropdownOpen(false), 200)}
                      className={`px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors duration-200 font-medium inline-flex items-center ${
                        isActive('/admin') || isActive('/admin/users') || isActive('/admin/jobs') ? 'text-indigo-600' : ''
                      }`}
                    >
                      Admin Panel
                      <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${isAdminDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isAdminDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                        <Link 
                          to="/admin" 
                          className={`flex items-center px-4 py-3 transition-colors duration-200 ${
                            isActive('/admin') 
                              ? 'bg-indigo-50 text-indigo-600' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <svg className="w-5 h-5 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          Dashboard
                        </Link>
                        <Link 
                          to="/admin/users" 
                          className={`flex items-center px-4 py-3 transition-colors duration-200 border-t border-gray-100 ${
                            isActive('/admin/users') 
                              ? 'bg-indigo-50 text-indigo-600' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <svg className="w-5 h-5 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          Manage Users
                        </Link>
                        <Link 
                          to="/admin/jobs" 
                          className={`flex items-center px-4 py-3 transition-colors duration-200 border-t border-gray-100 ${
                            isActive('/admin/jobs') 
                              ? 'bg-indigo-50 text-indigo-600' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <svg className="w-5 h-5 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Manage Jobs
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* User Profile Section */}
                <div className="ml-4 flex items-center space-x-3 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white text-sm font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium hidden lg:inline">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 font-medium shadow-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md transition-colors duration-200 font-medium ${
                    isActive('/login') ? 'text-indigo-600' : ''
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-sm ${
                    isActive('/register') ? 'ring-2 ring-indigo-300' : ''
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 ${
                  isActive('/') ? 'text-indigo-600 bg-indigo-50' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 ${
                      isActive('/dashboard') ? 'text-indigo-600 bg-indigo-50' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/my-jobs" 
                    className={`px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 ${
                      isActive('/my-jobs') ? 'text-indigo-600 bg-indigo-50' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Jobs
                  </Link>
                  <Link 
                    to="/create-job" 
                    className={`px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 ${
                      isActive('/create-job') ? 'text-indigo-600 bg-indigo-50' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Post Job
                  </Link>
                  
                  {user.role === 'admin' && (
                    <>
                      <Link 
                        to="/admin" 
                        className={`px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 ${
                          isActive('/admin') ? 'text-indigo-600 bg-indigo-50' : ''
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                      <Link 
                        to="/admin/users" 
                        className={`px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 ${
                          isActive('/admin/users') ? 'text-indigo-600 bg-indigo-50' : ''
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Manage Users
                      </Link>
                      <Link 
                        to="/admin/jobs" 
                        className={`px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 ${
                          isActive('/admin/jobs') ? 'text-indigo-600 bg-indigo-50' : ''
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Manage Jobs
                      </Link>
                    </>
                  )}

                  <div className="pt-4 mt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-gray-700 font-medium">{user.name}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link 
                    to="/login" 
                    className={`px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 ${
                      isActive('/login') ? 'text-indigo-600 bg-indigo-50' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-center font-medium ${
                      isActive('/register') ? 'ring-2 ring-indigo-300' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;