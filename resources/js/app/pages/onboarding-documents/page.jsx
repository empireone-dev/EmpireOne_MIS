import React from 'react'
import { OnboardingDocsStepper } from './sections/onboarding-documents-stepper'
import { useEffect } from 'react'
import store from '@/app/store/store'
import { get_on_boarding_thunk } from '../admin/onboarding/acknowledgement/redux/acknowledgement-thunk'

export default function OnboardingDocs() {

  useEffect(()=>{
    store.dispatch(get_on_boarding_thunk())
  },[])

  return (
    <div>
        <OnboardingDocsStepper/>
    </div>
  )
}
