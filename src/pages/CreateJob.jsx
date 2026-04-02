import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobForm from '../components/Jobs/JobForm';
import { jobAPI } from '../services/api';
import toast from 'react-hot-toast';

const CreateJob = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (jobData) => {
    setLoading(true);
    try {
      await jobAPI.createJob(jobData);
      toast.success('Job posted successfully! It will be visible after admin approval.');
      navigate('/my-jobs');
    } catch (error) {
      toast.error('Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Post a New Job</h1>
        <JobForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </div>
  );
};

export default CreateJob;