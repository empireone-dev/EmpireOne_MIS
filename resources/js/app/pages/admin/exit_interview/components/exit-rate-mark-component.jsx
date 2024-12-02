import React from 'react';

export default function ExitRateMarkComponent({ rate, value, name, onChange }) {
  return (
    <div className='flex items-center w-full'>
      <input
        onChange={(e) => onChange(e)}
        id={name}
        type="radio"
        value={value}
        name={name}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-black focus:ring-blue-500 focus:ring-2 mr-1"
      />
      <label htmlFor={name} className='w-full'>
        <b>{rate}</b>
      </label>
    </div>
  );
}
