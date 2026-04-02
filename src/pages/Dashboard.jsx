import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Jobs Posted', value: '0', link: '/my-jobs', color: 'bg-blue-500' },
    { title: 'Active Jobs', value: '0', link: '/my-jobs', color: 'bg-green-500' },
    { title: 'Applications', value: '0', link: '#', color: 'bg-purple-500' },
  ];

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Manage your job posts, track applications, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
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
              to="/create-job"
              className="block text-center btn-primary"
            >
              Post a New Job
            </Link>
            <Link
              to="/my-jobs"
              className="block text-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              View My Jobs
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tips for Success</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✓ Write clear and detailed job descriptions</li>
            <li>✓ Include competitive salary ranges</li>
            <li>✓ Highlight company culture and benefits</li>
            <li>✓ Respond to applicants quickly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;