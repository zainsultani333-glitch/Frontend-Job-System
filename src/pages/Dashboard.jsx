import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jobAPI } from '../services/api';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    applications: 0
  });

  useEffect(() => {
    fetchUserJobs();
  }, []);

  const fetchUserJobs = async () => {
    try {
      const data = await jobAPI.getMyJobs();
      setJobs(data);
      
      // Calculate stats
      const totalJobs = data.length;
      const activeJobs = data.filter(job => job.status === 'active').length;
      const pendingJobs = data.filter(job => job.status === 'pending').length;
      const totalApplications = data.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
      
      setStats({
        total: totalJobs,
        active: activeJobs,
        pending: pendingJobs,
        applications: totalApplications
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const statItems = [
    { title: 'Total Jobs Posted', value: stats.total, link: '/my-jobs', color: 'bg-blue-500', icon: '📋' },
    { title: 'Active Jobs', value: stats.active, link: '/my-jobs?filter=active', color: 'bg-green-500', icon: '✅' },
    { title: 'Pending Approval', value: stats.pending, link: '/my-jobs?filter=pending', color: 'bg-yellow-500', icon: '⏳' },
    { title: 'Applications', value: stats.applications, link: '#', color: 'bg-purple-500', icon: '📊' },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-11xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Welcome back, {user?.name}!
                  </h1>
                  <p className="text-gray-500 mt-1">
                    Here's what's happening with your job posts today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statItems.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-sm`}>
                  <span className="text-white text-xl">{stat.icon}</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              <div className="mt-3 text-xs text-gray-400">Click to view details</div>
            </Link>
          ))}
        </div>

        {/* Pending Jobs Section */}
        {jobs.filter(job => job.status === 'pending').length > 0 && (
          <div className="bg-yellow-50 rounded-2xl shadow-sm border border-yellow-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏳</span>
                <h2 className="text-lg font-semibold text-gray-800">Pending Approval ({jobs.filter(job => job.status === 'pending').length})</h2>
              </div>
              <Link to="/my-jobs?filter=pending" className="text-sm text-yellow-700 hover:text-yellow-800 font-medium">
                View all pending →
              </Link>
            </div>
            <div className="space-y-3">
              {jobs.filter(job => job.status === 'pending').slice(0, 3).map((job) => (
                <div key={job._id} className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-yellow-100">
                  <div>
                    <h3 className="font-medium text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{job.company} • {job.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Awaiting Approval
                    </span>
                    <p className="text-xs text-gray-400 mt-1">Posted {new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
              <p className="text-sm text-yellow-800">
                💡 Your job posts are pending review by our team. Once approved, they will appear as active jobs.
              </p>
            </div>
          </div>
        )}

        {/* Active Jobs Section */}
        {jobs.filter(job => job.status === 'active').length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <h2 className="text-lg font-semibold text-gray-800">Active Jobs ({jobs.filter(job => job.status === 'active').length})</h2>
              </div>
              <Link to="/my-jobs?filter=active" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all active →
              </Link>
            </div>
            <div className="space-y-3">
              {jobs.filter(job => job.status === 'active').slice(0, 3).map((job) => (
                <div key={job._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div>
                    <h3 className="font-medium text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{job.company} • {job.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {job.applications?.length || 0} applications
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Jobs State */}
        {jobs.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs posted yet</h3>
            <p className="text-gray-500 mb-6">Get started by posting your first job opportunity</p>
            <Link
              to="/create-job"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Post Your First Job
            </Link>
          </div>
        )}

        {/* Quick Actions & Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <Link
                to="/create-job"
                className="flex items-center justify-between w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors group"
              >
                <span className="font-medium">📝 Post a New Job</span>
                <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
              <Link
                to="/my-jobs?filter=active"
                className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <span className="font-medium">📂 View Active Jobs</span>
                <svg className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
              <Link
                to="/my-jobs?filter=pending"
                className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <span className="font-medium">⏳ View Pending Jobs</span>
                <svg className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>

          {/* Tips for Success */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Tips for Success</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Write clear and detailed job descriptions</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Include competitive salary ranges</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Highlight company culture and benefits</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Jobs are reviewed within 24 hours</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;