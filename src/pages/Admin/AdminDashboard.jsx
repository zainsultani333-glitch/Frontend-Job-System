import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    pendingJobs: 0,
    approvedJobs: 0,
    rejectedJobs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [users, jobs] = await Promise.all([
        adminAPI.getAllUsers(),
        adminAPI.getAllJobs(),
      ]);
      
      setStats({
        totalUsers: users.length,
        totalJobs: jobs.length,
        pendingJobs: jobs.filter(j => j.status === 'pending').length,
        approvedJobs: jobs.filter(j => j.status === 'approved').length,
        rejectedJobs: jobs.filter(j => j.status === 'rejected').length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const statCards = [
    { 
      title: 'Total Users', 
      value: stats.totalUsers, 
      color: 'from-blue-500 to-blue-600', 
      icon: '👥',
      link: '/admin/users' 
    },
    { 
      title: 'Total Jobs', 
      value: stats.totalJobs, 
      color: 'from-emerald-500 to-emerald-600', 
      icon: '💼',
      link: '/admin/jobs' 
    },
    { 
      title: 'Pending Jobs', 
      value: stats.pendingJobs, 
      color: 'from-amber-500 to-amber-600', 
      icon: '⏳',
      link: '/admin/jobs' 
    },
    { 
      title: 'Approved Jobs', 
      value: stats.approvedJobs, 
      color: 'from-green-500 to-green-600', 
      icon: '✓',
      link: '/admin/jobs' 
    },
    { 
      title: 'Rejected Jobs', 
      value: stats.rejectedJobs, 
      color: 'from-red-500 to-red-600', 
      icon: '✗',
      link: '/admin/jobs' 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-11xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 mt-1">Manage users, jobs, and platform settings</p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>System Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-xl">{stat.icon}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 group-hover:scale-110 transition-transform duration-300">
                    {stat.value.toLocaleString()}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {stat.title}
                </h3>
                <div className="mt-2 flex items-center text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                  <span>View details</span>
                  <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Decorative Border */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </Link>
          ))}
        </div>

        {/* Actions and Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <Link
                to="/admin/users"
                className="group flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-6 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-200 group-hover:bg-blue-500 transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-700 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Manage Users</span>
                    <p className="text-xs opacity-75 group-hover:text-blue-100">View and manage all registered users</p>
                  </div>
                </div>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                to="/admin/jobs"
                className="group flex items-center justify-between bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 px-6 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 hover:text-white transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-200 group-hover:bg-amber-500 transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-700 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Review Pending Jobs</span>
                    <p className="text-xs opacity-75 group-hover:text-amber-100">Review and approve submitted jobs</p>
                  </div>
                </div>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Platform is running smoothly</p>
                    <p classNames="text-xs text-gray-400">All systems operational</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 text-sm">⏳</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {stats.pendingJobs} job{stats.pendingJobs !== 1 ? 's' : ''} pending approval
                    </p>
                    <p className="text-xs text-gray-400">Awaiting your review</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">👥</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {stats.totalUsers} registered user{stats.totalUsers !== 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-gray-400">Active community members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;