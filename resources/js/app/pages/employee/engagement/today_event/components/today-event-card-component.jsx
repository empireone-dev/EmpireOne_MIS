import { StarIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function TodayEventCardComponent({event, date, status, description}) {
    return (
        <div>
            <div className='relative shadow-[5px_10px_20px_rgba(0,0,0,0.3)] border border-gray-300 rounded-md px-3 py-2 font-sans'>
                <div className='flex flex-wrap md:flex-nowrap flex-1'>
                    <div className='flex flex-col w-full mb-2'>
                        <h1 className='text-2xl'>Event: <b>{event}</b></h1>
                    </div>
                </div>
                <div className='flex flex-1 w-full text-lg'>
                    <div className='w-full'>
                        Date & Time of Event: {date}
                    </div>
                    <div className='w-full'>
                        Status: {status}
                    </div>
                </div>
                <div>
                    <div className='mt-4 mb-1'>
                        <h1 className='text-2xl'>Event Description</h1>
                    </div>
                    <div className='mb-2'>
                        <p className='text-lg'>{description}.</p>
                    </div>
                    <div className='flex flex-1 gap-3 w-full mt-5 text-center text-white'>
                        <div className='w-full bg-green-600 rounded-md p-1.5'>
                            <button className=''>
                                {/* <StarIcon className='h-6' /> */}
                                Rate Event</button>
                        </div>
                        <div className='w-full bg-yellow-600 rounded-md p-1.5'>
                            <button>Upload Image</button>
                        </div>
                    </div>
                </div>

                {/* Triangular Mark with Text */}
                {/* <div className='absolute top-0 right-0'>
                    <div className='w-0 h-0 border-t-[60px] rounded-tr-md border-t-red-500 border-l-[65px] border-l-transparent relative'>
                        <span className='absolute top-[-50px] right-[5px] rotate-45 text-white text-sm font-bold'>NEW</span>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
