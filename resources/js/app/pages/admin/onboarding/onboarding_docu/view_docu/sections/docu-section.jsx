import Summernote from '@/app/pages/_components/summernote'
import WysiwygEditDocu from '@/app/pages/_components/wysiwyg-edit-docu'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function DocuSection() {
  const { onboarding_doc } = useSelector((state) => state.onboarding_docs);
  const [form, setForm] = useState({});
  return (
    <div>
      <Summernote
        data={onboarding_doc?.data?.doc_content ?? ""}
        form={form}
        setForm={setForm}
      />
    </div>
  )
}
