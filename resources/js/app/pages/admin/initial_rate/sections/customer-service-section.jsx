import { UserCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import InitialRateMarkComponent from '../components/initial-rate-mark-component'
import { useDispatch, useSelector } from 'react-redux';
import { setInitialRate } from '../redux/initial-rate-state';

export default function CustomerServiceSection() {
    const { initialRate } = useSelector((state) => state.initial_rate);
    const dispatch = useDispatch();
    function handleRate(e) {
        dispatch(
            setInitialRate({
                ...initialRate,
                [e.target.name]: e.target.value,
            })
        );
    }
    return (
        <div>
            <div className="flex items-center mt-6 mb-2">
                <UserCircleIcon className="h-6" />
                <h1 className="text-2xl ml-1 font-bold">CUSTOMER SERVICE</h1>
            </div>
            <hr className='mb-1.5'>
            </hr>
            <div>
                <label htmlFor=""><b>CUSTOMER SERVICE SCORE</b></label>
                <div className='flex flex-1 w-full gap-8 mt-1'>
                <InitialRateMarkComponent
                        onChange={handleRate}
                        rate="1 - Very Poor"
                        name="cscore"
                        value="1"
                    />
                    <InitialRateMarkComponent
                        onChange={handleRate}
                        rate="2 - Poor"
                        name="cscore"
                        value="2"
                    />
                    <InitialRateMarkComponent
                        onChange={handleRate}
                        rate="3 - Average"
                        name="cscore"
                        value="3"
                    />
                    <InitialRateMarkComponent
                        onChange={handleRate}
                        rate="4 - Good"
                        name="cscore"
                        value="4"
                    />
                    <InitialRateMarkComponent
                        onChange={handleRate}
                        rate="5 - Excellent"
                        name="cscore"
                        value="5"
                    />
                </div>
            </div>
            <div className='mt-6'>
                <label htmlFor=""><b>CUSTOMER SERVICE NOTES</b></label>
                <textarea type="text"
                onChange={handleRate}
                    name="cnotes" placeholder="" className="border p-2 rounded w-full mt-1 h-40" />
            </div>
        </div>
    )
}
