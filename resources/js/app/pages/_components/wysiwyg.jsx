// src/components/MyEditor.js
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import JABlank from './ja-blank';

const Wysiwyg = ({ label, value, onChange,name }) => {
  return (
    <div>
      <h2>{label}</h2>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
      {/* <h3>Output:</h3>
      <div dangerouslySetInnerHTML={{ __html: editorData }} /> */}
    </div>
  );
};

export default Wysiwyg;
