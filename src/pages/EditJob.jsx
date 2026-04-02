import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobForm from '../components/Jobs/JobForm';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { jobAPI } from '../services/api';
import toast from 'react-hot-toast';

const EditJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const jobs = await jobAPI.getMyJobs();
      const foundJob = jobs.find(j => j._id === id);
      if (foundJob) {
        setJob(foundJob);
      } else {
        toast.error('Job not found');
        navigate('/my-jobs');
      }
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (jobData) => {
    setSubmitting(true);
    try {
      await jobAPI.updateJob(id, jobData);
      toast.success('Job updated successfully');
      navigate('/my-jobs');
    } catch (error) {
      toast.error('Failed to update job');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Job</h1>
        <JobForm initialData={job} onSubmit={handleSubmit} isLoading={submitting} />
      </div>
    </div>
  );
};

export default EditJob;