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
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-200">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              JobBoard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium relative ${
                isActive('/') ? 'text-white' : ''
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full animate-slideIn"></span>
              )}
            </Link>

            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium relative ${
                    isActive('/dashboard') ? 'text-white' : ''
                  }`}
                >
                  Dashboard
                  {isActive('/dashboard') && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full animate-slideIn"></span>
                  )}
                </Link>
                <Link 
                  to="/my-jobs" 
                  className={`px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium relative ${
                    isActive('/my-jobs') ? 'text-white' : ''
                  }`}
                >
                  My Jobs
                  {isActive('/my-jobs') && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full animate-slideIn"></span>
                  )}
                </Link>
                <Link 
                  to="/create-job" 
                  className={`px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium relative ${
                    isActive('/create-job') ? 'text-white' : ''
                  }`}
                >
                  Post Job
                  {isActive('/create-job') && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full animate-slideIn"></span>
                  )}
                </Link>
                
                {user.role === 'admin' && (
                  <div className="relative">
                    <button
                      onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                      onBlur={() => setTimeout(() => setIsAdminDropdownOpen(false), 200)}
                      className={`px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium inline-flex items-center relative ${
                        isActive('/admin') || isActive('/admin/users') || isActive('/admin/jobs') ? 'text-white' : ''
                      }`}
                    >
                      Admin Panel
                      <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${isAdminDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      {(isActive('/admin') || isActive('/admin/users') || isActive('/admin/jobs')) && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full animate-slideIn"></span>
                      )}
                    </button>
                    
                    {isAdminDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fadeInDown">
                        <Link 
                          to="/admin" 
                          className={`flex items-center px-4 py-3 transition-all duration-200 ${
                            isActive('/admin') 
                              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700' 
                              : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                          }`}
                        >
                          <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          Dashboard
                        </Link>
                        <Link 
                          to="/admin/users" 
                          className={`flex items-center px-4 py-3 transition-all duration-200 border-t border-gray-100 ${
                            isActive('/admin/users') 
                              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700' 
                              : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                          }`}
                        >
                          <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          Manage Users
                        </Link>
                        <Link 
                          to="/admin/jobs" 
                          className={`flex items-center px-4 py-3 transition-all duration-200 border-t border-gray-100 ${
                            isActive('/admin/jobs') 
                              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700' 
                              : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                          }`}
                        >
                          <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Manage Jobs
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* User Profile Section */}
                <div className="ml-4 flex items-center space-x-3 pl-4 border-l border-white/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-white/90 font-medium hidden lg:inline">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
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
                  className={`px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium relative ${
                    isActive('/login') ? 'text-white' : ''
                  }`}
                >
                  Login
                  {isActive('/login') && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full animate-slideIn"></span>
                  )}
                </Link>
                <Link 
                  to="/register" 
                  className={`ml-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 relative ${
                    isActive('/register') ? 'ring-2 ring-blue-300' : ''
                  }`}
                >
                  Register
                  {isActive('/register') && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-slideIn"></span>
                  )}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
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
          <div className="md:hidden py-4 border-t border-white/20 animate-slideDown">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative ${
                  isActive('/') ? 'text-white bg-white/10' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
                {isActive('/') && (
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-white rounded-full animate-slideInLeft"></span>
                )}
              </Link>

              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative ${
                      isActive('/dashboard') ? 'text-white bg-white/10' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                    {isActive('/dashboard') && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-white rounded-full animate-slideInLeft"></span>
                    )}
                  </Link>
                  <Link 
                    to="/my-jobs" 
                    className={`px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative ${
                      isActive('/my-jobs') ? 'text-white bg-white/10' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Jobs
                    {isActive('/my-jobs') && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-white rounded-full animate-slideInLeft"></span>
                    )}
                  </Link>
                  <Link 
                    to="/create-job" 
                    className={`px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative ${
                      isActive('/create-job') ? 'text-white bg-white/10' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Post Job
                    {isActive('/create-job') && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-white rounded-full animate-slideInLeft"></span>
                    )}
                  </Link>
                  
                  {user.role === 'admin' && (
                    <>
                      <Link 
                        to="/admin" 
                        className={`px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative ${
                          isActive('/admin') ? 'text-white bg-white/10' : ''
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                        {isActive('/admin') && (
                          <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-white rounded-full animate-slideInLeft"></span>
                        )}
                      </Link>
                      <Link 
                        to="/admin/users" 
                        className={`px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative ${
                          isActive('/admin/users') ? 'text-white bg-white/10' : ''
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Manage Users
                        {isActive('/admin/users') && (
                          <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-white rounded-full animate-slideInLeft"></span>
                        )}
                      </Link>
                      <Link 
                        to="/admin/jobs" 
                        className={`px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative ${
                          isActive('/admin/jobs') ? 'text-white bg-white/10' : ''
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Manage Jobs
                        {isActive('/admin/jobs') && (
                          <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-white rounded-full animate-slideInLeft"></span>
                        )}
                      </Link>
                    </>
                  )}

                  <div className="pt-4 mt-2 border-t border-white/20">
                    <div className="flex items-center justify-between px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 text-sm"
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
                    className={`px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative ${
                      isActive('/login') ? 'text-white bg-white/10' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                    {isActive('/login') && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-white rounded-full animate-slideInLeft"></span>
                    )}
                  </Link>
                  <Link 
                    to="/register" 
                    className={`px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 text-center font-medium relative ${
                      isActive('/register') ? 'ring-2 ring-blue-300' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                    {isActive('/register') && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600 rounded-full animate-slideInLeft"></span>
                    )}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add these animations to your global CSS or tailwind.config.js */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: scaleY(0);
          }
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.2s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;