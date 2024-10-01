import React from 'react'
import VirtualContractSection from './sections/virtual-contract-section'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_applicant_by_app_id_thunk } from '../admin/final_rate/redux/final-rate-thunk';

export default function VirtualContractPage() {
  const app_id = window.location.pathname.split('/')[2]
  useEffect(() => {
    store.dispatch(get_applicant_by_app_id_thunk(app_id))
  }, []);
  return (
    <div>
        <VirtualContractSection/>
    </div>
  )
}
