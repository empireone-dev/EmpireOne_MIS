import React from 'react'
import { useSelector } from 'react-redux';

export default function DocuSection() {
  const { onboarding_doc } = useSelector((state) => state.onboarding_docs);
  const rawPath = onboarding_doc?.data?.doc_content ?? null;
  const fileUrl = rawPath
    ? rawPath.startsWith('http')
      ? rawPath
      : `/api/storage-file/${rawPath}`
    : null;

  return (
    <div className="w-full">
      {fileUrl ? (
        <iframe
          src={fileUrl}
          title="Onboarding Document"
          className="w-full border border-gray-300 rounded"
          style={{ height: '81vh' }}
        />
      ) : (
        <p className="text-gray-500 text-sm">No document available.</p>
      )}
    </div>
  )
}
