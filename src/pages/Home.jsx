import React, { useState, useEffect } from 'react';
import JobCard from '../components/Jobs/JobCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { jobAPI } from '../services/api';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await jobAPI.getAllApproved();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Dream Job</h1>
        <p className="text-gray-600">Browse through thousands of job opportunities</p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by title, company, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input w-full max-w-md mx-auto block"
        />
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          No jobs found matching your search.
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;