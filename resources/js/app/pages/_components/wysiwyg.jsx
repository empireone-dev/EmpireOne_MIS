import React, { useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import DOMPurify from 'dompurify'; // Ensure this is correctly imported

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }, { 'size': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

export default function Wysiwyg({ label, value, onChange, name }) {
    const handleChange = useCallback((content) => {
        const sanitizedContent = DOMPurify.sanitize(content);
        onChange(sanitizedContent, name);
    }, [onChange, name]);

    return (
        <div>
            <label>{label}</label>
            <ReactQuill
                onChange={handleChange}
                className='h-[650px]'
                modules={modules}
                formats={formats}
                value={value}
            />
        </div>
    );
}
