import { BriefcaseIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import FinalRateMarkComponent from '../components/final-rate-mark-component'
import { useDispatch, useSelector } from 'react-redux';
import { setFinalRate } from '../redux/final-rate-slice';

export default function WorkEffectivenessFinalRateSection() {
    const { finalRate } = useSelector((state) => state.final_rate);
    const dispatch = useDispatch();
    function handleRate(e) {
        dispatch(
            setFinalRate({
                ...finalRate,
                [e.target.name]: e.target.value,
            })
        );
    }
    return (
        <div>
            <div className="flex items-center mt-6 mb-2">
                <BriefcaseIcon className="h-6" />
                <h1 className="text-2xl ml-1 font-bold">WORK EFFECTIVENESS</h1>
            </div>
            <hr className='mb-1.5'>
            </hr>
            <div>
                <label htmlFor=""><b>WORK EFFECTIVENESS SCORE</b></label>
                <div className='flex flex-1 w-full gap-8 mt-1'>
                    <FinalRateMarkComponent  onChange={handleRate} rate="1 - Very Poor" name="wscore" value="1" />
                    <FinalRateMarkComponent  onChange={handleRate} rate="2 - Poor" name="wscore" value="2"/>
                    <FinalRateMarkComponent  onChange={handleRate} rate="3 - Average" name="wscore" value="3"/>
                    <FinalRateMarkComponent  onChange={handleRate} rate="4 - Good" name="wscore" value="4"/>
                    <FinalRateMarkComponent  onChange={handleRate} rate="5 - Excellent" name="wscore" value="5"/>
                </div>
            </div>
            <div className='mt-6'>
                <label htmlFor=""><b>WORK EFFECTIVENESS NOTES</b></label>
                <textarea  onChange={handleRate} name='wnotes' type="text" placeholder="" className="border p-2 rounded w-full mt-1 h-40" />
            </div>
        </div>
    )
}
