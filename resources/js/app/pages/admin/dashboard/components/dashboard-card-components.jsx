import { GiftIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function DashboardCardComponents({name,number,icon}) {
  return (
    <div>
        <div class="bg-blue-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-700 text-white font-medium group">
            <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="stroke-current text-blue-900 transform transition-transform duration-500 ease-in-out">{icon}</svg>
            </div>
            <div class="text-right">
              <p class="text-2xl">{number}</p>
              <p>{name}</p>
            </div>
          </div>
    </div>
  )
}
