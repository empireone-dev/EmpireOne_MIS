import React from 'react';

export default function DashboardCardComponents({ name, number, icon, bgColor }) {

  const colorClasses = {
    green: 'bg-green-500 border-b-4 border-green-700',
    orange: 'bg-orange-500 border-b-4 border-orange-700',
    sky: 'bg-sky-500 border-b-4 border-sky-700',
    violet: 'bg-violet-500 border-b-4 border-violet-700',
    cyan: 'bg-cyan-500 border-b-4 border-cyan-700',
    pink: 'bg-pink-500 border-b-4 border-pink-700',
  };

  const defaultColorClass = 'bg-gray-500 border-gray-700';

  const bgColorClass = colorClasses[bgColor] || defaultColorClass;

  return (
    <div>
      <div className={`shadow-lg rounded-md flex items-center justify-between p-3 ${bgColorClass} text-white font-medium group`}>
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-900 transform transition-transform duration-500 ease-in-out">
            {icon}
          </svg>
        </div>
        <div className="text-right">
          <p className="text-2xl">{number}</p>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
}
