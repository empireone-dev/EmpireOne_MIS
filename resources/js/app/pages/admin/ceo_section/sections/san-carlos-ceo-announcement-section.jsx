import { DeleteOutlined } from '@ant-design/icons'
import React from 'react'

export default function SanCarlosCeoAnnouncementSection() {
    return (
        <div className='mt-4'>
            <div>
                <div className='flex flex-1'>
                    <img src="/images/ITlogo.png" alt="" className='h-14' />
                    <div className='flex flex-col w-full ml-1'>
                        <h1 className='text-lg'><b>(CEO) System Administrator</b></h1>
                        <div><i>• 4hrs ago</i></div>
                    </div>
                    <div className='p-3'>
                        <button className='text-xl hover:text-blue-500'><DeleteOutlined /></button>
                    </div>
                </div>
                <div>
                    <div className='mt-2 mb-1'>
                        <h1 className='text-2xl'>ANNOUNCEMENT TITLE FOR SAN CARLOS</h1>
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
    )
}
