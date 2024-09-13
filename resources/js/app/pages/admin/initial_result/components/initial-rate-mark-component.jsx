import React from 'react';

export default function InitialRateMarkComponent({ rate, value,score,name }) {
  return (
    <div className='flex items-center w-full'>
      <input
        checked={value == score}
        id="default-radio-1"
        type="radio"
        value={value}
        name={name}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-black focus:ring-blue-500 focus:ring-2 mr-1"
      />
      <label htmlFor="default-radio-1" className='w-full'>
        <b>{rate}{`${value == score}`}</b>
      </label>
    </div>
  );
}
