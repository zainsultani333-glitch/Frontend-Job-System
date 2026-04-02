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
    { title: 'Total Users', value: stats.totalUsers, color: 'bg-blue-500', link: '/admin/users' },
    { title: 'Total Jobs', value: stats.totalJobs, color: 'bg-green-500', link: '/admin/jobs' },
    { title: 'Pending Jobs', value: stats.pendingJobs, color: 'bg-yellow-500', link: '/admin/jobs' },
    { title: 'Approved Jobs', value: stats.approvedJobs, color: 'bg-green-600', link: '/admin/jobs' },
    { title: 'Rejected Jobs', value: stats.rejectedJobs, color: 'bg-red-500', link: '/admin/jobs' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Manage users, jobs, and platform settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <span className="text-white text-xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/admin/users"
              className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Manage Users
            </Link>
            <Link
              to="/admin/jobs"
              className="block text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Review Pending Jobs
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-2 text-gray-600">
            <p>✓ Platform is running smoothly</p>
            <p>✓ {stats.pendingJobs} jobs pending approval</p>
            <p>✓ {stats.totalUsers} registered users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;