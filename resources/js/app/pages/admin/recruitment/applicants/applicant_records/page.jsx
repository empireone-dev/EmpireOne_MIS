import React from 'react'
import AdminLayout from '../../../admin-layout'
import ApplicantsTableSection from './sections/applicants-table-section'
import store from '@/app/store/store';
import { useEffect } from 'react';
import { get_applicant_thunk } from './redux/applicant-thunk';
import { get_job_position_thunk } from '../../../sourcing/job_title_section/redux/job-title-thunk';
import { useState } from 'react';
import Skeleton from '@/app/pages/_components/skeleton';
import { useDispatch } from 'react-redux';

export default function ApplicantRecords() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        
        await store.dispatch(get_applicant_thunk());
        await store.dispatch(get_job_position_thunk());
        
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load applicant data. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    }
    loadData()
  }, []);

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {loading ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        <ApplicantsTableSection />
      )}
    </AdminLayout>
  )
}
