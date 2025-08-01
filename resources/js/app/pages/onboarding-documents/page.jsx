import React from 'react'
import { OnboardingDocsStepper } from './sections/onboarding-documents-stepper'
import { useEffect } from 'react'
import store from '@/app/store/store'
import { get_on_boarding_thunk } from '../admin/onboarding/acknowledgement/redux/acknowledgement-thunk'
import { get_onboarding_ackdoc_by_id_thunk } from '../admin/file_201/redux/file-201-thunk'

export default function OnboardingDocs() {
  const app_id = window.location.pathname.split('/')[2]

  useEffect(() => {
    // store.dispatch(get_on_boarding_thunk())
    store.dispatch(get_onboarding_ackdoc_by_id_thunk(app_id))
  }, [])

  return (
    <div>
      <OnboardingDocsStepper />
    </div>
  )
}
