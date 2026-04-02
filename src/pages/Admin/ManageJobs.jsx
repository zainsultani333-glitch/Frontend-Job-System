import React, { useState, useEffect } from 'react';
import JobCard from '../../components/Jobs/JobCard';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await adminAPI.getAllJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await adminAPI.approveJob(id);
      toast.success('Job approved successfully');
      fetchJobs();
    } catch (error) {
      toast.error('Failed to approve job');
    }
  };

  const handleReject = async (id) => {
    try {
      await adminAPI.rejectJob(id);
      toast.success('Job rejected successfully');
      fetchJobs();
    } catch (error) {
      toast.error('Failed to reject job');
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    return job.status === filter;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Jobs</h1>
        <p className="text-gray-600">Review and manage all job postings</p>
      </div>

      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          All Jobs
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter('rejected')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Rejected
        </button>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500">No jobs found</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredJobs.map(job => (
            <JobCard
              key={job._id}
              job={job}
              showActions={true}
              onApprove={handleApprove}
              onReject={handleReject}
              isAdmin={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageJobs;