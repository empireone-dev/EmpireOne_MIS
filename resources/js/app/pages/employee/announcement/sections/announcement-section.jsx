import React from 'react'
import EmployeeLayout from '../../employee-layout'
import { DeleteOutlined } from '@ant-design/icons'

export default function AnnouncementSection() {
    return (
        <div className='rounded-lg p-3 flex flex-col font-sans'>
            <div className=' flex bg-blue-400 p-6 rounded-t-lg mb-5'>
                <h1 className='text-4xl font-sans text-white'><b>Announcements</b></h1>
            </div>
            <div className='mb-6'>
                <div>
                    <h1 className='text-xl font-light text-zinc-400 ml-2'><b>Today</b></h1>
                </div>
                <div className='flex flex-col gap-5 mt-1 mx-2'>
                    <div className='relative shadow-[5px_10px_20px_rgba(0,0,0,0.3)] border border-gray-300 rounded-md px-3 py-8'>
                        <div className='flex flex-wrap md:flex-nowrap flex-1'>
                            <img src="/images/ITlogo.png" alt="" className='h-14' />
                            <div className='flex flex-col w-full ml-1'>
                                <h1 className='text-lg'><b>(CEO) System Administrator</b></h1>
                                <div><i>• 4hrs ago</i></div>
                            </div>
                        </div>
                        <div className='flex flex-wrap md:flex-nowrap flex-1'>
                            <div className='w-full'>
                                <div></div>
                            </div>
                        </div>
                        <div>
                            <div className='mt-2 mb-1'>
                                <h1 className='text-2xl'>ANNOUNCEMENT TITLE</h1>
                            </div>
                            <div className='mb-2'>
                                <p>Announcement Content: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut odio massa. Donec lobortis pellentesque diam at porttitor. Etiam ac luctus lorem. Aenean non turpis sed ipsum eleifend dapibus. Aenean sodales eu orci quis rhoncus. Praesent vitae diam massa. Aenean sed lectus massa. Nunc a nisi non nibh cursus mattis. Cras eget finibus lectus. Nunc quis ornare est, eget mollis orci. Pellentesque eleifend sollicitudin nunc sit amet hendrerit. Mauris blandit purus eget urna maximus malesuada. Fusce facilisis et neque non facilisis. Suspendisse mattis sollicitudin dolor quis condimentum. Quisque gravida viverra tortor, eleifend condimentum turpis.</p>
                            </div>
                            <div className='flex flex-wrap gap-3'>
                                <img src="/images/ITlogo.png" alt="" className='h-56 w-56' />
                                <img src="/images/scemployee.jpg" alt="" className='h-56 w-56' />
                            </div>
                        </div>

                        <div className='absolute top-0 right-0'>
                            <div className='w-0 h-0 border-t-[60px] rounded-tr-md border-t-red-500 border-l-[65px] border-l-transparent relative'>
                                <span className='absolute top-[-50px] right-[5px] rotate-45 text-white text-sm font-bold'>NEW</span>
                            </div>
                        </div>
                    </div>



                    <div className='shadow-[5px_10px_20px_rgba(0,0,0,0.3)] border border-gray-300 rounded-md px-3 py-8 '>
                        <div className='flex flex-1'>
                            <img src="/images/male.png" alt="" className='h-14 rounded-[.95rem]' />
                            <div className='flex flex-col flex-wrap md:flex-nowrap w-full ml-1'>
                                <h1 className='text-lg'><b>(Human Resource) EmpireOne HR</b></h1>
                                <div><i>• Aug. 11, 2024 | 06:24 PM</i></div>
                            </div>
                        </div>
                        <div>
                            <div className='mt-2 mb-1'>
                                <h1 className='text-2xl'>ANNOUNCEMENT TITLE</h1>
                            </div>
                            <div className='mb-2'>
                                <p>Announcement Content: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut odio massa. Donec lobortis pellentesque diam at porttitor. Etiam ac luctus lorem. Aenean non turpis sed ipsum eleifend dapibus. Aenean sodales eu orci quis rhoncus. Praesent vitae diam massa. Aenean sed lectus massa. Nunc a nisi non nibh cursus mattis. Cras eget finibus lectus. Nunc quis ornare est, eget mollis orci. Pellentesque eleifend sollicitudin nunc sit amet hendrerit. Mauris blandit purus eget urna maximus malesuada. Fusce facilisis et neque non facilisis. Suspendisse mattis sollicitudin dolor quis condimentum. Quisque gravida viverra tortor, eleifend condimentum turpis.</p>
                            </div>
                            <div className='flex flex-1 gap-3'>
                                <img src="/images/ITlogo.png" alt="" className='h-56 w-56' />
                                <img src="/images/scemployee.jpg" alt="" className='h-56 w-56' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-4'>
                <div>
                    <h1 className='text-xl font-light text-zinc-400 ml-2'><b>Yesterday</b></h1>
                </div>
                <div className='flex flex-col gap-5 mt-1 mx-2'>
                    <div className='shadow-[5px_10px_20px_rgba(0,0,0,0.3)] border border-gray-300 rounded-md px-3 py-8 '>
                        <div className='flex flex-wrap md:flex-nowrap flex-1'>
                            <img src="/images/ITlogo.png" alt="" className='h-14' />
                            <div className='flex flex-col w-full ml-1'>
                                <h1 className='text-lg'><b>(CEO) System Administrator</b></h1>
                                <div><i>• 4hrs ago</i></div>
                            </div>
                        </div>
                        <div className='flex flex-wrap md:flex-nowrap flex-1'>
                            <div className='w-full'>
                                <div>Aug. 11, 2024 | 06:24 PM</div>
                            </div>
                        </div>
                        <div>
                            <div className='mt-2 mb-1'>
                                <h1 className='text-2xl'>ANNOUNCEMENT TITLE</h1>
                            </div>
                            <div className='mb-2'>
                                <p>Announcement Content: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut odio massa. Donec lobortis pellentesque diam at porttitor. Etiam ac luctus lorem. Aenean non turpis sed ipsum eleifend dapibus. Aenean sodales eu orci quis rhoncus. Praesent vitae diam massa. Aenean sed lectus massa. Nunc a nisi non nibh cursus mattis. Cras eget finibus lectus. Nunc quis ornare est, eget mollis orci. Pellentesque eleifend sollicitudin nunc sit amet hendrerit. Mauris blandit purus eget urna maximus malesuada. Fusce facilisis et neque non facilisis. Suspendisse mattis sollicitudin dolor quis condimentum. Quisque gravida viverra tortor, eleifend condimentum turpis.</p>
                            </div>
                            <div className='flex flex-wrap gap-3'>
                                <img src="/images/ITlogo.png" alt="" className='h-56 w-56' />
                                <img src="/images/scemployee.jpg" alt="" className='h-56 w-56' />
                            </div>
                        </div>
                    </div>
                    <div className='shadow-[5px_10px_20px_rgba(0,0,0,0.3)] border border-gray-300 rounded-md px-3 py-8 '>
                        <div className='flex flex-1'>
                            <img src="/images/male.png" alt="" className='h-14 rounded-[.95rem]' />
                            <div className='flex flex-col w-full ml-1'>
                                <h1 className='text-lg'><b>(Human Resource) EmpireOne HR</b></h1>
                                <div><i>• 4hrs ago</i></div>
                            </div>
                        </div>
                        <div className='flex flex-1'>
                            <div className='w-full'>
                                <div>Aug. 11, 2024| 06:24 PM</div>
                            </div>
                        </div>
                        <div>
                            <div className='mt-2 mb-1'>
                                <h1 className='text-2xl'>ANNOUNCEMENT TITLE</h1>
                            </div>
                            <div className='mb-2'>
                                <p>Announcement Content: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut odio massa. Donec lobortis pellentesque diam at porttitor. Etiam ac luctus lorem. Aenean non turpis sed ipsum eleifend dapibus. Aenean sodales eu orci quis rhoncus. Praesent vitae diam massa. Aenean sed lectus massa. Nunc a nisi non nibh cursus mattis. Cras eget finibus lectus. Nunc quis ornare est, eget mollis orci. Pellentesque eleifend sollicitudin nunc sit amet hendrerit. Mauris blandit purus eget urna maximus malesuada. Fusce facilisis et neque non facilisis. Suspendisse mattis sollicitudin dolor quis condimentum. Quisque gravida viverra tortor, eleifend condimentum turpis.</p>
                            </div>
                            <div className='flex flex-1 gap-3'>
                                <img src="/images/ITlogo.png" alt="" className='h-56 w-56' />
                                <img src="/images/scemployee.jpg" alt="" className='h-56 w-56' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
